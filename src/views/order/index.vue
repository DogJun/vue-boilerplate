<template>
  <div class="order">
    <div class="banner">
      <img :src="data.cover_url" alt="banner">
    </div>
    <div class="info">
      <div class="info-title">
        <p>{{data.subject}}</p>
      </div>
      <div class="info-content">
        <div class="box">
          <div class="box-left">预约截止</div>
          <div class="box-right">{{data.enroll_end}}</div>
        </div>
        <div class="box">
          <div class="box-left">项目地址</div>
          <div class="box-right">{{data.location}}<span class="icon-addr"></span></div>
        </div>
        <div class="box">
          <div class="box-left">咨询电话</div>
          <div class="box-right"><a class="tel" :href="'tel:' + data.contact_number">{{data.contact_number}}</a></div>
        </div>
      </div>
    </div>
    <notice/>
    <div class="list">
      <div class="list-title">
        <span class="label">预约信息</span>
      </div>
      <div class="list-content clearfix">
        <div class="list-item">
          <div class="time pull-left">
            <span>2018-05-29 星期二</span>
          </div>
          <div class="operation pull-right">
            <span>58/100</span>
            <a href="#" class="btn">预约</a>
          </div>
        </div>
        <div class="list-item list-item_disable">
          <div class="time pull-left">
            <span>2018-05-29 星期二</span>
          </div>
          <div class="operation pull-right">
            <span>约满</span>
          </div>
        </div>
        <div class="list-item list-item_disable">
          <div class="time pull-left">
            <span>2018-05-29 星期二</span>
          </div>
          <div class="operation pull-right">
            <span>已过期</span>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-wrapper">
      <div class="mask"></div>
      <div class="layer">
        <div class="layer-title"></div>
        <div class="layer-content">
          <div class="list-item">
            <div class="time pull-left">
              <span>2018-05-29 星期二</span>
            </div>
            <div class="operation pull-right">
              <span>58/100</span>
              <a href="#" class="btn">预约</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import notice from 'widgets/notice'
import { getDetail } from 'api'
export default {
  name: 'order',
  data () {
    return {
      data: {}
    }
  },
  created () {
    getDetail({id: '39e9fe45-d752-ec83-2481-dd7cc2e5c4de'}).then(res => {
      this.data = res.data
    })
  },
  components: {
    notice
  }
}
</script>

<style lang="less">
@import "~common/styles/variables.less";
@import "~common/styles/mixin.less";
.order {
  font-size: 30px;/*px*/
}
.label {
  color: @shallow-font-color;
  position: relative;
  padding-left: 22px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -14px;
    width: 6px;
    min-width: 3px;/*no*/
    height: 30px;
    background: linear-gradient(360deg,@theme 0%,@shallow-theme 100%);
    border-radius: 13px;
  }
}
.banner {
  width: 100%;
  height: 400px;
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.info {
  background: #fff;
  margin-bottom: 20px;
  .info-title {
    padding: 34px 30px;
    font-size: 32px;/*px*/
    color: @font-color;
    .border-bottom-1px();
  }
  .info-content {
    padding: 40px 30px;
    .box {
      font-size: 0;
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
      .box-left {
        display: inline-block;
        font-size: 30px;
        width: 160px;
        color: @shallow-font-color;
      }
      .box-right {
        display: inline-block;
        width: 530px;
        font-size: 30px;
        color: @font-color;
        .tel {
          color: #399CFE;
        }
        .icon-addr {
          display: inline-block;
        }
      }
    }
  }
}
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
.list {
  background: #fff;
  margin-bottom: 20px;
  .list-title {
    padding: 34px 30px;
    .border-bottom-1px();
  }
  .list-content {
    .list-item {
      height: 100px;
      padding: 0 30px;
      .border-bottom-1px();
      .time {
        color: @font-color;
        line-height: 100px;
      }
      .operation {
        color: @font-color;
        line-height: 100px;
        .btn {
          display: inline-block;
          width: 108px;
          height: 60px;
          line-height: 56px;
          border-radius: 8px;
          border: 2px solid @theme;/*no*/
          color: @theme;
          text-align: center;
          margin-left: 20px;
        }
      }
      &.list-item_disable {
        .time {
          color: @shallow-font-color;
        }
        .operation {
          color: @shallow-font-color;
        }
      }
    }
  }
}
.layer-wapper {
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
  }
}
</style>

