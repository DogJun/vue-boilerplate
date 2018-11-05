<template>
  <div class="demo">
    this is a demo component hhhh ~
    <p>{{msg}}</p>
  </div>
</template>

<style lang="less" scoped>
  .demo {
    color: #cccddd;

    & > p {
      color: #f00;
    }
  }
</style>

<script>
console.log('hello')
export default {
  props: {
    msg: String
  }
}
</script>


