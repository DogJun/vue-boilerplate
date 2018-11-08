<template>
  <div class="detail">
    <notice/>
    <div class="detail-content">
      <div class="box">
        <div class="box-left">项目地址</div>
        <div class="box-right">测试数据测试地址<span class="icon-addr"></span></div>
      </div>
      <div class="box">
        <div class="box-left">房间</div>
        <div class="box-right">
          <ul>
            <li>花中原-北区1栋-A-4AQ04</li>
            <li>花中原-A(住)-S-S08</li>
          </ul>
        </div>
      </div>
      <div class="box">
        <div class="box-left">业主</div>
        <div class="box-right">李珊珊</div>
      </div>
      <div class="box">
        <div class="box-left">手机号码</div>
        <div class="box-right">15018501281</div>
      </div>
      <div class="box">
        <div class="box-left">预约时间</div>
        <div class="box-right">2018-06-02 星期一 09:00~10:00</div>
      </div>
      <div class="box">
        <div class="box-left">到访人数</div>
        <div class="box-right">2</div>
      </div>
      <div class="box">
        <div class="box-left">特殊成员</div>
        <div class="box-right">老人</div>
      </div>
      <div class="box">
        <div class="box-left">其他需求</div>
        <div class="box-right">老人腿脚不方便，需要轮椅</div>
      </div>
      <div class="box">
        <div class="box-left">状态</div>
        <div class="box-right label_active">未签到</div>
      </div>
      <div class="box">
        <div class="box-left">取消原因</div>
        <div class="box-right">时间冲突，重新预约其他时间</div>
      </div>
    </div>
    <btn text="取消预约"/>
  </div>
</template>

<script>
import notice from 'widgets/notice'
import btn from 'widgets/btn'
export default {
  name: 'detail',
  components: {
    notice,
    btn
  }
}
</script>

<style lang="less">
@import "~common/styles/variables.less";
.detail-content {
  background: #fff;
  padding: 40px 30px;
  margin-bottom: 40px;
  .box {
    font-size: 0;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
    .box-left {
      display: inline-block;
      vertical-align: top;
      font-size: 30px;
      width: 160px;
      color: @shallow-font-color;
    }
    .box-right {
      display: inline-block;
      width: 530px;
      font-size: 30px;
      color: @font-color;
      .icon-addr {
        display: inline-block;
      }
      &.label_active {
        color: @theme;
      }
    }
  }
}
</style>
