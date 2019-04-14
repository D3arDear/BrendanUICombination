<template>
  <div class="z-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ZealotButtonGroup",
  mounted() {
    for (let node of this.$el.children) {
      let name = node.nodeName.toLowerCase();
      if (name !== "button") {
        console.warn(
          `z-button-group 的子元素应该全是 button,似乎您写的是 <${name}>。`
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.z-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .z-button {
    border-radius: 0;
    &:not(:first-child) {
      margin-left: -1px;
    }
    &:first-child {
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }
    &:last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-raidus);
    }
    &:hover {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
