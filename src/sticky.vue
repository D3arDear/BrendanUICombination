<template>
  <div class="zealot-sticky-wrapper" ref="wrapper" :style="{height}">
    <div class="zealot-sticky" :class="classes" :style="{left,width}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zealotSticky",
  props: {},
  data() {
    return {
      sticky: false,
      left: undefined,
      width: undefined,
      height: undefined
    };
  },
  mounted() {
    this.windowScrollHandler = this._windowScrollHandler.bind(this);
    window.addEventListener("scroll", this.windowScrollHandler);
  },
  created() {},
  beforeDestroy() {
    window.removeEventListener("scroll", this.windowScrollHandler);
  },
  methods: {
    top() {
      let { top } = this.$refs.wrapper.getBoundingClientRect();
      return { top: top + window.scrollY };
    },
    _windowScrollHandler() {
      let { top } = this.top();
      if (window.scrollY > top) {
        let {
          height,
          left,
          width
        } = this.$refs.wrapper.getBoundingClientRect();
        console.log(height, left, width);
        this.height = height + "px";
        this.left = left + "px";
        this.width = width + "px";
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }
  },
  computed: {
    classes() {
      return {
        sticky: this.sticky
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.zealot-sticky {
  &.sticky {
    position: fixed;
    top: 0;
    // left: 0;
    // width: 100%;
  }
}
</style>
