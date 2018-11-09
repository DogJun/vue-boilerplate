<template>
  <div class="inform" >
    <div class="content" v-html="detail"></div>
  </div>
</template>

<script>
import { getNoticeDetail } from 'api'
export default {
  name: 'inform',
  data () {
    return {
      detail: ''
    }
  },
  created () {
    console.log(this.$route.params.id)
    getNoticeDetail({id: '39e9fe45-d752-ec83-2481-dd7cc2e5c4de'}).then(res => {
      console.log(res)
      this.detail = res.data.detail
    })
  }
}
</script>

<style lang="less" scoped>
  .inform {
    height: 100%;
  }
  .content {
    padding: 38px 30px;
    font-size: 30px;/*px*/
    min-height: 100%;
    background: #fff;
  }
</style>
