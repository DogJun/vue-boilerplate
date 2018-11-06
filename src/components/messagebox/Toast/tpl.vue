<style scoped lang="less">
.wc-toast {
  position: fixed;
  z-index: 999999;
  line-height: 34px;
}

.wc-toast--default {
  max-width: 520px;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 160px;
}
.wc-toast--center {
  max-width: 520px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.wc-toast--top {
  top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.wc-toast-message {
  max-width: 540px;
  font-size: 28px;/*px*/
  line-height: 1.4;
  padding: 22px 36px;
  text-align: center;
  color: #fff;
  border-radius: 8px;
  background: rgba(0,0,0,1);
  opacity: 0.7;

  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  img {
    margin-bottom: 16px;
  }
  .wc-toast__text {
  }
}
.wc-fade-enter {
  opacity: 0;
}
.wc-fade-enter-active,
.wc-fade-leave-active {
  transition: opacity 0.4s;
}
.wc-fade-leave-active {
  opacity: 0;
}
</style>
<template>
	<transition name="wc-fade">
		<div class="wc-toast" v-if="show" :class="{'wc-toast--center': location == 'center'|| location =='', 'wc-toast--default': location == 'bottom', 'wc-toast--top': location == 'top'}">
			<div class="wc-toast-message" :style="toastStyle">
				<img :src="path" alt="" :style="imgStyle" v-if="path">
				<div class="wc-toast__text" :style="textStyle">{{content}}</div>
			</div>
		</div>
	</transition>
</template>
<script>
import pageChange from "../mixins"
export default {
  mixins: [pageChange],
  data() {
    return {
      show: false,
      content: "",
      duration: 1500,
      location: "center",
      toastStyle: {},
      imgStyle: {},
      textStyle: {},
      path: ""
    }
  }
}
</script>