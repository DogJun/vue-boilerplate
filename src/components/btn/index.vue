<template>
  <div class="btn" @click="clickFn">
    <a href="javascript:;" class="btn" :class="{'active': isActive}">{{text}}</a>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    text: {
      type: String,
      default: '下一步'
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    clickFn () {
      // 派发点击事件
      this.$emit('btnClick')
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
  .btn {
    a {
      display: block;
      width: 690px;
      height: 90px;
      line-height: 90px;
      margin: 0 auto;
      border-radius: 8px;
      font-size: 32px;/*px*/
      text-align: center;
      box-sizing: border-box;
      border: none;
      color: #fff;
      background: linear-gradient(90deg,rgba(255,184,66,1) 0%,rgba(243,152,0,1) 100%);
    }
  } 
</style>
