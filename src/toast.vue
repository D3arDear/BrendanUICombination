<template>
  <div class="toast">
    <slot></slot>
    <div class="line"></div>
    <span class="close" v-if="closeButton" @click="onClickClose">
      {{ closeButton.text }}
    </span>
  </div>
</template>
<script>
export default {
  name: "Zealot-toast",
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    autoCloseDelay: {
      type: Number,
      default: 3
    },
    closeButton: {
      type: Object,
      default: () => ({
        text: "关闭",
        callback: undefined
      })
    }
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.autoCloseDelay * 1000);
    }
  },
  methods: {
    close() {
      this.$el.remove();
      this.$destroy;
    },
    log() {
      console.log("测试");
    },
    onClickClose() {
      this.close();
      if (this.closeButton && typeof this.closeButton.callback === "function") {
        this.closeButton.callback(this); // this === toast 实例
      }
    }
  }
};
</script>
<style lang="scss">
$font-size: 14px;
$toast-height: 40px;
$toast-bg: #222020c2;
$box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
.toast {
  position: fixed;
  top: 0;
  border-radius: 2px;
  left: 50%;
  color: #eeeeee;
  padding: 0 16px;
  transform: translateX(-50%);
  font-size: $font-size;
  line-height: 1.8;
  height: $toast-height;
  display: flex;
  align-items: center;
  background: $toast-bg;
  box-shadow: $box-shadow;
}
.close {
  padding-left: 16px;
  cursor: pointer;
}
.line {
  height: 100%;
  border-left: 1px solid #8a8a8a;
  margin-left: 16px;
}
</style>


