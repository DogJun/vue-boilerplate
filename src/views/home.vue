<template>
  <div class="home">
    <demo msg="Welcome"/>
    <img class="img" src="../common/img/dog.jpg" alt="dog">
  </div>
</template>

<script>
import demo from 'components/demo.vue'

export default {
  name: 'home',
  components: {
    demo
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

