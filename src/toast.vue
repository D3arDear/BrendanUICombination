<template>
  <div class="toast" ref="toast" :class="toastClasses">
    <div class="message">
      <slot v-if="!enableHTML"></slot>
      <div v-else v-html="$slots.default[0]"></div>
    </div>
    <div class="line" ref="line"></div>
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
      default: 20
    },
    closeButton: {
      type: Object,
      default: () => ({
        text: "关闭",
        callback: undefined
      })
    },
    enableHTML: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "middle"].indexOf(value) >= 0;
      }
    }
  },
  mounted() {
    this.updateStyles();
    this.execAutoClose();
  },
  computed: {
    toastClasses() {
      return { [`position-${this.position}`]: true };
    }
  },
  methods: {
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoCloseDelay * 1000);
      }
    },
    updateStyles() {
      this.$nextTick(() => {
        this.$refs.line.style.height = `${
          this.$refs.toast.getBoundingClientRect().height
        }px`;
      });
    },
    close() {
      this.$el.remove();
      this.$emit("close");
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
$toast-min-height: 40px;
$toast-bg: #222020c2;
$box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.toast {
  animation: fadeIn 1s;
  .message {
    padding: 8px 0;
  }
  position: fixed;
  line-height: 1.8;
  border-radius: 2px;

  color: #eeeeee;
  padding: 0 16px;
  left: 50%;
  font-size: $font-size;
  line-height: 1.8;
  min-height: $toast-min-height;
  display: flex;
  align-items: center;
  background: $toast-bg;
  box-shadow: $box-shadow;
  white-space: wrap;
  .close {
    flex-shrink: 0;
    padding-left: 16px;
    cursor: pointer;
  }
  .line {
    border-left: 1px solid #151515;
    margin-left: 16px;
  }
  &.position-top {
    transform: translateX(-50%);
    left: 50%;
    top: 0;
  }
  &.position-bottom {
    transform: translateX(-50%);
    bottom: 0;
  }
  &.position-middle {
    transform: translate(-50%, -50%);
    top: 50%;
  }
}
</style>


