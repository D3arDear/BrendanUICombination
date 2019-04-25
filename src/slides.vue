<template>
  <div class="z-slides">
    <div class="z-slides-window" ref="window">
      <div class="z-slides-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zealotSlides",
  props: {
    selected: {
      type: String
    }
  },
  mounted() {
    this.updateChildren();
  },
  updated() {
    this.updateChildren();
  },
  methods: {
    updateChildren() {
      let first = this.$children[0];
      let selected = this.selected || first.name;
      this.$children.forEach(vm => {
        vm.selected = this.selected;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.z-slides {
  display: inline-block;
  border: 1px solid grey;
  &-window {
  }
  &-wrapper {
    position: relative;
  }
}
</style>
