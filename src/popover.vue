<template>
  <div class="popover" @click.stop="xxx">
    <div class="content-wrapper" v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zealotPopover",
  data() {
    return { visible: false };
  },
  methods: {
    xxx() {
      this.visible = !this.visible;
      console.log("切换 visible");
      if (this.visible === true) {
        setTimeout(() => {
          console.log("新增 document click 监听器");
          let eventHandler = () => {
            this.visible = false;
            document.removeEventListener("click", eventHandler);
          };
          document.addEventListener("click", eventHandler);
        });
      } else {
        console.log("隐藏 popover");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$box-shadow-color: rgba(0, 0, 0, 0.3);
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
  .content-wrapper {
    position: absolute;
    bottom: 100%;
    left: 0;
    box-shadow: 0 0 3px $box-shadow-color;
    border: 1px solid red;
  }
}
</style>
