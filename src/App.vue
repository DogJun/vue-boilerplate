<template>
  <div id="app">
    <top/>
    <router-view/>
  </div>
</template>

<script>
import top from 'widgets/top'
export default {
  name: 'app',
  components: {
    top
  }
}
</script>
