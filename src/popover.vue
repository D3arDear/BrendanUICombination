<template>
  <div class="popover" @click.stop="xxx">
    <div ref="contentWrapper" class="content-wrapper" v-show="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
      <slot></slot>
    </span>
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
        this.$nextTick(() => {
          document.body.appendChild(this.$refs.contentWrapper);
          let {
            width,
            height,
            top,
            left
          } = this.$refs.triggerWrapper.getBoundingClientRect();
          this.$refs.contentWrapper.style.left = left + window.scrollX + "px";
          this.$refs.contentWrapper.style.top = top + window.scrollY + "px";
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
  },
  mounted() {
    document.body.appendChild(this.$refs.contentWrapper);
    console.log(this.$refs.triggerWrapper);
  }
};
</script>
<style lang="scss" >
$box-shadow-color: rgba(0, 0, 0, 0.3);
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  box-shadow: 0 0 3px $box-shadow-color;
  border: 1px solid red;
  transform: translateY(-100%);
}
</style>
