<template>
  <div class="order" v-if="loaded">
    <div class="banner" v-if="coverUrl">
      <img :src="coverUrl" alt="banner">
    </div>
    <div class="info">
      <div class="info-title">
        <p>{{subject}}</p>
      </div>
      <div class="info-content">
        <div class="box">
          <div class="box-left">预约截止</div>
          <div class="box-right">{{enrollEnd}}</div>
        </div>
        <div class="box">
          <div class="box-left">项目地址</div>
          <!-- todo 支持地图跳转，添加地址icon -->
          <div class="box-right">{{location}}<span class="icon-addr"></span></div>
        </div>
        <div class="box" v-if="contactNumber">
          <div class="box-left">咨询电话</div>
          <div class="box-right"><a class="tel" :href="'tel:' + contactNumber">{{contactNumber}}</a></div>
        </div>
      </div>
    </div>
    <notice :id="id"/>
    <div class="list">
      <div class="list-title">
        <span class="label">预约信息</span>
      </div>
      <div class="list-content clearfix">
        <div class="list-item" :class="{'list-item_disable': item.isExpire}" v-for="(item, index) in timeList" :key="index">
          <div class="time pull-left">
            <span>{{item.date}}</span>
          </div>
          <div class="operation pull-right">
            <span v-if="item.isExpire">已过期</span>
            <span v-if="item.isFull && !allowExtraEnroll">约满</span>
            <span v-if="item.isShowNum">{{item.num}}</span>
            <a href="#" class="btn" v-if="!item.isExpire && item.isOrder" @click="showLayer(index)">预约</a>
            <a href="#" class="btn" v-if="item.isAdd && allowExtraEnroll">加号</a>
          </div>
        </div>
      </div>
    </div>
    <div class="layer-wrapper" v-if="isShowLayer">
      <div class="mask" @click="hideLayer" @touchmove.prevent></div>
      <div class="layer" @touchmove.prevent>
        <div class="layer-title">{{timeList[layerIndex].date}} 可预约交付时段</div>
        <div class="layer-content">
          <div class="list-item" :class="{'list-item_disable': item.isExpire}" v-for="(item, index) in timeArr" :key="index">
            <div class="time pull-left">
              <span>{{item.date}}</span>
            </div>
            <div class="operation pull-right">
              <span v-if="item.isExpire">已过期</span>
              <span v-if="item.isFull && !allowExtraEnroll">约满</span>
              <span v-if="item.isShowNum">{{item.num}}</span>
              <router-link 
                class="btn" 
                v-if="!item.isExpire && item.isOrder"
                :to="{ name: 'confirm', params: { id, time: '222' }}">
                预约
              </router-link>
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
      loaded: false,
      id: '',
      coverUrl: '',
      subject: '',
      enrollEnd: '',
      location: '',
      contactNumber: '',
      allowExtraEnroll: 0,
      timeList: [],
      isShowLayer: false,
      layerIndex: 0,
      timeArr: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    // 39e9fe45-d752-ec83-2481-dd7cc2e5c4de
    getDetail({id: '39e9fe45-d752-ec83-2481-dd7cc2e5c4de'}).then(res => {
      this.loaded = true
      const data = res.data
      this.id = data.id
      this.coverUrl = data.cover_url
      this.subject = data.subject
      this.enrollEnd = data.enroll_end
      this.location = data.location
      this.contactNumber = data.contact_number
      this.allowExtraEnroll = parseInt(data.allow_extra_enroll, 10)
      this.handleData(data.interval)
    })
  },
  methods: {
    handleData (obj) {
      let self = this
      let keyArr = Object.keys(obj)
      let endDate = ''
      let result = []
      let isExpire = false// 是否过期
      let isLimit = false// 是否有上限
      let isOrder = false// 是否可预约
      let num = ''// 当前预约情况
      let isShowNum = false// 是都显示当前预约情况
      let isAdd = false // 是否允许加号
      let isFull = false // 是否约满
      keyArr.forEach((item, index) => {
        let len = obj[item].times.pm.length
        let maxNum = obj[item].max_enroll_count // 最大预约人数
        let orderNum = obj[item].enroll_count // 已经预约人数
        let date = item.replace(/\//g, '-')
        endDate = `${date} ${obj[item].times.pm[len - 1].time.split('-')[1]}:00`
        isExpire = this.compareDate(endDate)
        isLimit = maxNum > 0
        // 有上限
        if (isLimit) {
          num = `${orderNum}/${maxNum}`
          // 没约满
          if (enroll_count < max_enroll_count) {
            isOrder = true
            isShowNum = true
          } else {
            // 约满
            // 是否允许加号
            if (self.allowExtraEnroll === "1") {
              isAdd = true
            } else {
              isFull = true
              isAdd = false
            }
          }
        } else {
          isOrder = true
          isShowNum = false
        }
        this.timeList.push({
          // 日期
          date: `${date} ${obj[item].weekday}`, 
          // 是否过期
          isExpire, 
          // 是否有限制
          isLimit,
          isOrder,
          num,
          isShowNum,
          times: isOrder ? obj[item].times : {}
        })
      })
    },
    hideLayer () {
      this.isShowLayer = false
      this.timeArr = []
    },
    showLayer (index) {
      console.log(index)
      this.isShowLayer = true
      this.layerIndex = index
      let amTimeArr = this.timeList[index].times.am
      let pmTimeArr = this.timeList[index].times.pm
      this.handleLayerDate(index, amTimeArr, 'am')
      this.handleLayerDate(index, pmTimeArr, 'pm')
    },
    // 比较日期
    compareDate (date) {
      let curDate = new Date()
      let endDate = new Date(date)
      if (curDate > endDate) {
        return true
      }
      return false
    },
    // 处理弹层显示的数据
    handleLayerDate (index, arr, type = 'am') {
      let endDay = this.timeList[index].date.split(' ')[0]
      let amTimeArr = this.timeList[index].times.am
      let pmTimeArr = this.timeList[index].times.pm
      arr.forEach((item, index) => {
        let endTime = `${endDay} ${item.time.split('-')[1]}:00`
        let maxNum = parseInt(item.max_enroll_count, 10) // 最大预约人数
        let orderNum = parseInt(item.enroll_count, 10) // 已经预约人数
        let isLimit = maxNum > 0  // 是否有上限
        let isOrder = false // 是否可预约
        let num = '' // 当前预约情况
        let isShowNum = false // 是否显示当前预约情况
        let isFull = false // 是否约满
        // 有上限
        if (isLimit) {
          // 没约满
          if (enroll_count < max_enroll_count) {
            num = `${orderNum}/${maxNum}`
            isOrder = true
            isShowNum = true
          } else {
            // 约满
            isFull = true
          }
        } else {
          isOrder = true
          isShowNum = false
        }
        this.timeArr.push({
          date: type === 'am' ? `上午 ${item.time.replace(/-/g, '~')}` : `下午 ${item.time.replace(/-/g, '~')}`,
          isExpire: this.compareDate(endTime),
          isLimit,
          isOrder,
          num,
          isShowNum
        })
      })
      console.log(this.timeArr)
    }
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
}
.layer-wrapper {
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .layer {
    z-index: 10000;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .layer-title {
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background: #fff;
      font-size: 30px;/*px*/
      color: @font-color;
      .border-bottom-1px();
    }
  }
}
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
</style>

