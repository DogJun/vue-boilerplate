<template>
  <transition name="picker-fade">
    <div class="picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>
          <div class="picker-choose border-bottom-1px">
            <span class="cancel" @click="cancel">{{cancelTxt}}</span>
            <span class="confirm" @click="confirm">{{confirmTxt}}</span>
            <h1 class="picker-title">{{title}}</h1>
          </div>
          <div class="picker-content">
            <div class="mask-top"></div>
            <div class="mask-bottom"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel" v-for="(data, index) in pickerData" :key="index">
                <ul class="wheel-scroll">
                  <li v-for="(item, index) in data" :key="index" class="wheel-item">{{item.text}}</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- <div class="picker-footer"></div> -->
        </div>
      </transition>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  const STATE_HIDE = 0
  const STATE_SHOW = 1

  const COMPONENT_NAME = 'picker'
  const EVENT_SELECT = 'select'
  const EVENT_VALUE_CHANGE = 'valuechange'
  const EVENT_CANCEL = 'cancel'
  const EVENT_CHANGE = 'change'

  export default {
    name: COMPONENT_NAME,
    props: {
      // 数据
      data: {
        type: Array,
        default () {
          return []
        }
      },
      // 标题
      title: {
        type: String
      },
      // 取消文字
      cancelTxt: {
        type: String,
        default: '取消'
      },
      // 确认文字
      confirmTxt: {
        type: String,
        default: '确定'
      },
      selectedIndex: {
        type: Array,
        default () {
          return []
        }
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        state: STATE_HIDE,
        pickerData: this.data.slice(),
        pickerSelectedIndex: this.selectedIndex,
        pickerSelectedVal: [],
        pickerSelectedText: []
      }
    },
    created () {
      if (!this.pickerSelectedIndex.length) {
        this.pickerSelectedIndex = []
        for (let i = 0; i < this.pickerData.length; i++) {
          this.pickerSelectedIndex[i] = 0
        }
      }
    },
    methods: {
      // 确认
      confirm () {
        if (!this._canConfirm()) {
          return
        }
        this.hide()

        let changed = false
        for (let i = 0; i < this.pickerData.length; i++) {
          let index = this.wheels[i].getSelectedIndex()
          this.pickerSelectedIndex[i] = index

          let value = null
          if (this.pickerData[i].length) {
            value = this.pickerData[i][index].value
          }
          if (this.pickerSelectedVal[i] !== value) {
            changed = true
          }
          this.pickerSelectedText[i] = this.pickerData[i][index].text
        }

        this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)

        if (changed) {
          this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
        }
      },
      // 取消
      cancel () {
        this.hide()
        this.$emit(EVENT_CANCEL)
      },
      // 显示 picker
      show () {
        if (this.state === STATE_SHOW) {
          return
        }
        this.state = STATE_SHOW

        if (!this.wheels || this.dirty) {
          this.$nextTick(() => {
            this.wheels = []
            let wheelWrapper = this.$refs.wheelWrapper
            for (let i = 0; i < this.pickerData.length; i++) {
              this._createWheel(wheelWrapper, i)
            }
            this.dirty = false
          })
        } else {
          for (let i = 0; i < this.pickerData.length; i++) {
            this.wheels[i].enable()
            this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
          }
        }
      },
      // 隐藏 picker
      hide () {
        this.state = STATE_HIDE

        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].disable()
        }
      },
      setData (data) {
        this.pickerData = data.slice()
        this.dirty = true
      },
      setSelectedIndex (index) {
        this.pickerSelectedIndex = index
      },
      refill (datas) {
        let ret = []
        if (!datas.length) {
          return ret
        }
        datas.forEach((data, index) => {
          ret[index] = this.refillColumn(index, data)
        })
        return ret
      },
      refillColumn (index, data) {
        if (this.state !== STATE_SHOW) {
          console.error('can not use refillColumn when picker is not show')
          return
        }
        const wheelWrapper = this.$refs.wheelWrapper
        let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
        let wheel = this.wheels[index]
        if (scroll && wheel) {
          let oldData = this.pickerData[index]
          this.$set(this.pickerData, index, data)
          let selectedIndex = wheel.getSelectedIndex()
          let dist = 0
          if (oldData.length) {
            let oldValue = oldData[selectedIndex].value
            for (let i = 0; i < data.length; i++) {
              if (data[i].value === oldValue) {
                dist = i
                break
              }
            }
          }
          this.pickerSelectedIndex[index] = dist
          this.$nextTick(() => {
            // recreate wheel so that the wrapperHeight will be correct.
            wheel = this._createWheel(wheelWrapper, index)
            wheel.wheelTo(dist)
          })
          return dist
        }
      },
      scrollTo (index, dist) {
        const wheel = this.wheels[index]
        this.pickerSelectedIndex[index] = dist
        wheel.wheelTo(dist)
      },
      refresh () {
        setTimeout(() => {
          this.wheels.forEach((wheel, index) => {
            wheel.refresh()
          })
        }, 200)
      },
      _createWheel (wheelWrapper, i) {
        if (!this.wheels[i]) {
          this.wheels[i] = new BScroll(wheelWrapper.children[i], {
            wheel: {
              selectedIndex: this.pickerSelectedIndex[i]
            },
            probeType: 3
          })

          this.wheels[i].on('scrollEnd', () => {
            this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
          })
        } else {
          this.wheels[i].refresh()
        }

        return this.wheels[i]
      },
      _canConfirm () {
        return this.wheels.every((wheel) => {
          return !wheel.isInTransition
        })
      }
    },
    watch: {
      data (newData) {
        this.setData(newData)
      }
    }
  }
</script>

<style scoped lang="less">
  // @import "~common/stylus/variable"
  @import "~common/styles/mixin.less";
  .picker{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 28px;/*px*/
    background-color: rgba(37, 38, 45, .4);
    &.picker-fade-enter, &.picker-fade-leave-active {
      opacity: 0;
    }
    &.picker-fade-enter-active, &.picker-fade-leave-active {
      transition: all .3s ease-in-out;
    }
    .picker-panel {
      position: absolute;
      z-index: 600;
      bottom: 0;
      width: 100%;
      height: 522px;
      background: #fff;
      &.picker-move-enter, &.picker-move-leave-active {
        transform: translate3d(0, 546px, 0);/*no*/
      }
      &.picker-move-enter-active, &.picker-move-leave-active {
        transition: all .3s ease-in-out;
      }
      .picker-choose {
        position: relative;
        height: 88px;
        color: #999;
        background:rgba(250,250,248,1);
        box-shadow:0px 1px 0px 0px rgba(225,224,224,1);
        .picker-title {
          margin: 0;
          line-height: 88px;
          font-weight: normal;
          text-align: center;
          font-size: 36px;/*px*/
          color: #333;
        }
        .confirm, .cancel {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 32px;/*px*/
          color: #606060;
        }
        .confirm {
          right: 0;
          padding-right: 32px;
          &:active {
            color: #606060;
          }
        }
        .cancel {
          left: 0;
          padding-left: 32px;
          &:active {
            color: #606060;
          }
        }
      }
      .picker-content {
        position: relative;
        top: 6px;
        .mask-top, .mask-bottom {
          z-index: 10;
          width: 100%;
          height: 184px;
          pointer-events: none;
          transform: translateZ(0);
        }
        .mask-top {
          .border-bottom-1px(#ABA9A2);
          position: absolute;
          top: 0;
          background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
        }
        .mask-bottom {
          .border-top-1px(#ABA9A2);
          position: absolute;
          bottom: 1px;/*no*/
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
        }
      }
      .wheel-wrapper {
        display: flex;
        padding: 0 5px;
        .wheel {
          -ms-flex: 1 1 0.000000001px;/*no*/
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;/*no*/
          flex-basis: 0.000000001px;/*no*/
          width: 1%;
          height: 434px;
          overflow: hidden;
          font-size: 36px;/*px*/
          .wheel-scroll {
            padding: 0;
            margin-top: 184px;
            list-style: none;
            .wheel-item {
              list-style: none;
              height: 66px;
              line-height: 66px;
              overflow: hidden;
              white-space: nowrap;
              color: #333;
            }
          }
        }
      }
    }
    // .picker-footer {
    //   height: 40px
    // }
  }
</style>
