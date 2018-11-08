<template>
  <div class="home">
    <!-- <img class="img" src="../../common/img/dog.jpg" alt="dog"> -->
    <button @click="alert">
			Alert
		</button>
    <button @click="confirm">
			confirm
		</button>
    <button @click="loading">
			loading
		</button>
    <button @click="toast">
			toast
		</button>
    <button @click="picker">
      picker
    </button>
    <picker @select="handleSelect(arguments)"
      :selected-index="selectedIndex"
      ref="picker"
      :title="pickerTitle">
    </picker>
    <btn @btnClick="btnClick"/>
    <error/>
  </div>
</template>

<script>
import picker from 'components/picker'
import btn from 'widgets/btn'
import error from 'components/error'
const list = [
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
console.log(process.env.API_HOST)
console.log(process.env.NODE_ENV)
export default {
  name: 'home',
  data () {
    return {
      pickerTitle: '',
      selectedIndex: [0]
    }
  },
  mounted () {
    // picker组件初始化数据
    this.$refs.picker.setData([list])
    this.$refs.picker.setSelectedIndex([0])
  },
  components: {
    picker,
    btn,
    error
  },
  methods: {
    btnClick () {
      console.log('点击了')
    },
    alert () {
      this.$alert('第一个弹窗')
    },
    confirm () {
      this.$confirm('确定吗？')
    },
    loading () {
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
      }, 2000)
    },
    toast () {
      this.$toast('当前时段已无剩余名额，请重新选择')
    },
    picker () {
      let picker = this.$refs.picker
      picker.show()
    },
    // picker 选择 handle
    handleSelect (args) {
      console.log(args[2].join(', '))
    }
  }
}
</script>

<style lang="less" scoped>
  .img {
    width: 750px;
    height: 750px;
    border: 1px solid #ddd;/*no*/
  }
</style>

