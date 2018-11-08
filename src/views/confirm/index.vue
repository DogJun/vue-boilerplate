<template>
  <div class="confirm">
    <div class="info">
      <div class="info-title">
        您的预约详情
      </div>
      <div class="info-content">
        <div class="box">
          <div class="box-left">业主</div>
          <div class="box-right">张珊珊</div>
        </div>
        <div class="box">
          <div class="box-left">房间</div>
          <div class="box-right">
            <ul>
              <li>花中原-北区1栋-A-4AQ04</li>
              <li>花中原-北区1栋-A-4AQ04</li>
              <li>花中原-北区1栋-A-4AQ04</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="box-left">预约收楼时间</div>
          <div class="box-right">2018-06-02 星期一 09:00~10:00</div>
        </div>
        <div class="box">
          <div class="box-left">手机号码</div>
          <div class="box-right">13498580552</div>
        </div>
        <div class="box">
          <div class="box-left">到访人数</div>
          <div class="box-right select" @click="picker"><span>{{num}}</span></div>
        </div>
        <div class="box">
          <div class="box-left">特殊成员</div>
          <div class="box-right">
            <label class="checkbox">
              <input type="checkbox" name="type" value="1" id="checkbox1" checked hidden/>
              <label for="checkbox1" class="checkbox-label"></label>
              <span class="checkbox-name">小孩</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" name="type" value="2" id="checkbox2" hidden/>
              <label for="checkbox2" class="checkbox-label"></label>
              <span class="checkbox-name">老人</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" name="type" value="3" id="checkbox3" hidden/>
              <label for="checkbox3" class="checkbox-label"></label>
              <span class="checkbox-name">孕妇</span>
            </label>
          </div>
        </div>
      </div>
      <div class="textarea">
        <textarea placeholder="请填写补充说明"></textarea>
        <span>200</span>
      </div>
      <btn text="提交"/>
      <picker @select="handleSelect(arguments)"
        :selected-index="selectedIndex"
        ref="picker"
        :title="pickerTitle">
      </picker>
    </div>
  </div>
</template>

<script>
import btn from 'widgets/btn'
import picker from 'components/picker'

const numList = [
  {
    text: '1',
    value: 1
  },
  {
    text: '2',
    value: 2
  },
  {
    text: '3',
    value: 3
  },
  {
    text: '4',
    value: 4
  },
  {
    text: '5',
    value: 5
  },
  {
    text: '6',
    value: 6
  },
  {
    text: '7',
    value: 7
  },
  {
    text: '8',
    value: 8
  },
  {
    text: '9',
    value: 9
  }
]
export default {
  name: 'confirm',
  data () {
    return {
      pickerTitle: '',
      selectedIndex: [0],
      num: 1
    }
  },
  components: {
    btn,
    picker
  },
  mounted () {
    // picker组件初始化数据
    this.$refs.picker.setData([numList])
    this.$refs.picker.setSelectedIndex([0])
  },
  methods: {
    picker () {
      let picker = this.$refs.picker
      picker.show()
    },
    // picker 选择 handle
    handleSelect (args) {
      console.log(args[2].join(', '))
      this.num = args[2].join(', ')
    }
  }
}
</script>

<style lang="less">
@import "~common/styles/variables.less";
@import "~common/styles/mixin.less";
.info {
  .info-title {
    padding: 34px 30px;
    font-size: 32px;/*px*/
    color: @font-color;
    background: #fff;
    .border-bottom-1px();
  }
  .info-content {
    background: #fff;
    padding: 34px 30px;
    .border-bottom-1px();
    .box {
      font-size: 0;
      margin-bottom: 40px;
      .box-left {
        display: inline-block;
        vertical-align: top;
        width: 218px;
        color: @shallow-font-color;
        font-size: 30px;/*px*/
      }
      .box-right {
        display: inline-block;
        width: 472px;
        color: @font-color;
        font-size: 30px;/*px*/
      }
      .select {
        height: 80px;
        line-height: 80px;
        padding: 0 28px;
        border: 1px solid #EBEBEB;/*no*/
        position: relative;
        &:after {
          content: '';
          display: block;
          position: absolute;
          right: 22px;
          top: 50%;
          margin-top: -8px;
          width: 28px;
          height: 16px;
          background-image: url('../../common/img/arrow-down.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      .checkbox {
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
        .checkbox-label{
          height: 30px;
          width: 30px;
          display: inline-block;
          background-repeat: no-repeat;
          background-position: center;
          vertical-align: middle;
          border: 2px solid @border-color;
        }
        .checkbox-name {
          display: inline-block;
          vertical-align: middle;
          margin-left: 20px;
        }
      }
      input[type="checkbox"]:checked + .checkbox-label {
        background-image: url('../../common/img/check.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 16px 14px;
      }
    }
  }
  .textarea {
    position: relative;
    margin-bottom: 40px;
    textarea {
      width: 100%;
      height: 240px;
      border: none;
      padding: 30px;
      color: @font-color;
      font-size: 28px;/*px*/
      &::-webkit-input-placeholder {
        color: @shallow-font-color;
        font-weight: 400;
        font-size: 28px;/*px*/
      }
    }
    span {
      position: absolute;
      bottom: 30px;
      right: 30px;
      color: #BBBBBB;
      font-size: 28px;/*px*/
    }
  }
}
</style>


