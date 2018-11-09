<template>
  <div class="home">
    <div class="tab" @click="tabHandle">
      <div class="tab-item" id="order" :class="{ 'tab-item_active': tab === 'order' }">交付预约</div>
      <div class="tab-item" id="my" :class="{ 'tab-item_active': tab === 'my' }">我的预约</div>
    </div>
    <div class="order-list" v-if="tab === 'order'" :class="{'full-height': noOrderList}">
      <div class="list-item" v-if="orderList.length" v-for="item in orderList" :key="item.id">
        <div class="list-item-left">
          <p class="title">{{item.subject}}</p>
          <p class="desc">交付内容：{{item.buildings}}</p>
          <p class="desc">预约截止：{{item.enroll_end}}</p>
        </div>
        <div class="list-item-right">
          <router-link class="btn" :to="{ name: 'order', params: { id: item.id }}">预约</router-link>
        </div>
      </div>
      <error :isErr="noOrderList" imgType="noList" errCont="您购买的房产尚未开放交付预约，请耐心等待"/>
    </div>
    <div class="my-list" v-else :class="{'full-height': noOrderList}">
      <div class="list-item" v-if="myList.length" v-for="(item, index) in myList" :key="index">
        <div class="box">
          <div class="box-left">
            <span class="desc">房间</span>
          </div>
          <div class="box-right">
            <ul>
              <li v-for="room in item.rooms" :key="room.roo_id">{{room.room_name}}</li>
            </ul>
          </div>
        </div>
        <div class="box" v-if="item.interval_date && item.start_time && item.end_time">
          <div class="box-left">
            <span class="desc">预约时间</span>
          </div>
          <div class="box-right">
            <span>{{item.interval_date}} {{item.start_time && item.start_time.slice(11, 16)}}~{{item.end_time && item.end_time.slice(11, 16)}}</span>
          </div>
        </div>
        <div class="box">
          <div class="box-left">
            <span class="desc">状态</span>
          </div>
          <div class="box-right">
            <span :class="{ label_active: item.status === '未签到' }">{{item.status}}</span>
          </div>
        </div>
      </div>
      <error :isErr="noMyList" imgType="noList" errCont="您暂时还没有任何预约记录"/>
    </div>
  </div>
</template>

<script>
import { getList } from 'api'
import error from 'widgets/error'
export default {
  name: 'home',
  data () {
    return {
      tab: 'order', // order: 预约列表 my: 我的预约
      orderList: [],
      myList: [],
      noOrderList: false,
      noMyList: false
    }
  },
  created () {
    // 开发环境先写死app_mid
    getList({type: 'delivery'}).then(res => {
      this.orderList = res.data.list
      this.myList = res.data.my_list
      res.data.list.length > 0 ? this.noOrderList = false : this.noOrderList = true
      res.data.my_list.length > 0 ? this.noMyList = false : this.noMyList = true
    })
  },
  mounted () {
  },
  components: {
    error
  },
  methods: {
    tabHandle (e) {
      if (e.target.id === 'order') {
        this.tab = 'order'
      } else {
        this.tab = 'my'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~common/styles/variables.less";
  @import "~common/styles/mixin.less";
  .home {
    padding-top: 110px;
    height: 100%;
  }
  .tab {
    width: 100%;
    height: 90px;
    line-height: 90px;
    font-size: 0;
    color: @shallow-font-color;
    background: #fff;
    margin-bottom: 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    .tab-item {
      display: inline-block;
      width: 50%;
      font-size: 28px;/*px*/ 
      text-align: center;
      &.tab-item_active {
        position: relative;
        color: @font-color;
        font-size: 500;
        &:after {
          content: '';
          width: 60px;
          height: 8px;
          background: linear-gradient(90deg,@shallow-theme 0%,@theme 100%);
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -30px;
          border-radius: 4px;
        }
      }
    }
  }
  .full-height {
    min-height: 100%;
  }
  // 预约列表
  .order-list {
    background: #fff;
    
    .list-item {
      padding: 30px 30px 30px 0;
      margin-left: 30px;
      font-size: 0;
      .border-bottom-1px();
      .list-item-left {
        display: inline-block;
        vertical-align: middle;
        width: 522px;
        .title {
          font-size: 32px;
          line-height: 1.8;
          color: @font-color;
          .text-overflow();
        }
        .desc{
          font-size: 28px;
          line-height: 1.8;
          color: @shallow-font-color;
        }
      }
      .list-item-right {
        display: inline-block;
        vertical-align: middle;
        width: 168px;
        .btn {
          display: inline-block;
          width: 168px;
          height: 60px;
          line-height: 60px;
          font-size: 28px;/*px*/
          color: #fff;
          text-align: center;
          background: linear-gradient(90deg,@shallow-theme 0%,@theme 100%);
          border-radius: 8px;
        }
      }
    }
  }
  // 我的预约
  .my-list {
    background: #fff;
    .list-item {
      padding: 30px 30px 30px 0;
      margin-left: 30px;
      position: relative;
      &:before {
        content: '';
        display: block;
        width: 16px;
        height: 28px;
        position: absolute;
        right: 40px;
        top: 50%;
        margin-top: -14px;
        background-image: url('../../common/img/arrow-left.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .border-bottom-1px();
      .box {
        font-size: 0;
        .box-left {
          display: inline-block;
          vertical-align: top;
          width: 156px;
          font-size: 30px;
          line-height: 1.8;
          color: @shallow-font-color;
        }
        .box-right {
          display: inline-block;
          vertical-align: top;
          width: 534px;
          font-size: 30px;
          line-height: 1.8;
          color: @font-color;
          .label_active {
            color: @theme;
          }
        }
      }
    }
  }
</style>

