<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
            <div class="pullup-wrapper" v-if="pullUpLoad">
              <div class="before-trigger" v-if="!isPullUpLoad">
                <span>{{pullUpTxt}}</span>
              </div>
              <div class="after-trigger" v-else>
                <!-- <b-loading></b-loading> -->
                <p>正在加载中...</p>
              </div>
            </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  const DEFAULT_LOAD_TXT_MORE = '加载更多'
  const DEFAULT_LOAD_TXT_NO_MORE = '没有更多数据了'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      }
    },
    mounted () {
      // 保证dom渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    data () {
      return {
        isPullUpLoad: false,
        pullUpDirty: true,
        pulling: false
      }
    },
    created () {
      this.pullDownInitTop = -50
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }

        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          pullUpLoad: this.pullUpLoad
        })

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }

        // 上拉加载更多
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disbale () {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable () {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh () {
        // 代理better-sc的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      // 数据变化刷新
      forceUpdate (dirty) {
        if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      // 初始化上拉
      _initPullUpLoad () {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          this.$emit('pullingUp')
        })
      },
      noMoreData () {
        this.pullUpDirty = false
      }
    },
    computed: {
      // 上拉加载文字
      pullUpTxt () {
        const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && (this.pullUpLoad.txt.more || DEFAULT_LOAD_TXT_MORE)

        const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && (this.pullUpLoad.txt.noMore || DEFAULT_LOAD_TXT_NO_MORE)

        return this.pullUpDirty ? moreTxt : noMoreTxt
      }
    },
    watch: {
      // 监听数据变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data () {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pulldown-wrapper
  position: absolute
  width: 100%
  left: 0
  display: flex
  justify-content center
  align-items center
  transition: all
  .after-trigger
    margin-top: 10px
    span
      color: #a1a1a2
.pullup-wrapper
  width: 100%
  display: flex
  justify-content center
  align-items center
  padding: 16px 0
  .before-trigger
    span
      color: #a1a1a2
      font-size: 24px;/*px*/
</style>
