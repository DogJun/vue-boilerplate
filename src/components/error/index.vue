<template>
  <div class="error" v-show="isErr">
    <img src="./imgs/error@2x.png" alt="error">
    <p>{{errCont}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    // 是否显示
    isErr: {
      type: Boolean,
      default: true
    },
    // 错误内容
    errCont: {
      type: String,
      default: '未找到手机为13895623645的业主房产,请与工作人员核实'
    }
  },
  data () {
    return {
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
.error {
  text-align: center;
  img {
    width: 462px;
    height: 376px;
  }
  p {
    max-width: 462px;
    color: rgba(160,160,160,1);
    line-height: 40px;
    color: 28px;/*px*/
    margin: 0 auto;
    text-align: center;
    margin-top: 22px;
  }
}
</style>
