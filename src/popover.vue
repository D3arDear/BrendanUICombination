<template>
  <div class="popover" @click="xxx">
    <div class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <slot @click="xxx"></slot>
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
