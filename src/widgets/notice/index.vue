<template>
  <div class="notice clearfix">
    <div class="notice-left pull-left">
      <span class="label">交付须知</span>
    </div>
    <div class="notice-right pull-right">
      <a href="#">查看详情<span class="icon-arrow"></span></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice'
}
</script>

<style lang="less">
@import "~common/styles/variables.less";

.notice {
  width: 100%;
  padding: 34px 30px;
  background: #fff;
  margin-bottom: 20px;
  font-size: 30px;/*px*/
  .notice-right {
    color: @theme;
    .icon-arrow {
      display: inline-block;
      vertical-align: text-bottom;
      width: 28px;
      height: 28px;
      margin-left: 4px;
      background-image: url('../../common/img/arrow-left.png');
      background-repeat: no-repeat;
      background-position: bottom right;
      background-size: 16px 28px;
    }
  }
}
</style>

