<template>
  <div class="error" v-show="isErr">
    <img v-if="imgType === 'noList'" src="./imgs/noList.png" alt="error">
    <img v-if="imgType === 'error'" src="./imgs/error.png" alt="error">
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
    // 图片地址
    imgType: {
      type: String,
      default: 'error'
    },
    // 错误内容
    errCont: {
      type: String,
      default: '未找到手机为13895623645的业主房产,请与工作人员核实'
    }
  }
}
</script>

<style scoped lang="less">
.error {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 496px;
    height: 452px;
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
