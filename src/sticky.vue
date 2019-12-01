<template>
  <div class="zealot-sticky-wrapper" ref="wrapper" :style="{ height }">
    <div class="zealot-sticky" :class="classes" :style="{ left, width, top }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zealotSticky",
  props: {
    distance: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sticky: false,
      left: undefined,
      width: undefined,
      height: undefined,
      top: undefined,
      timerId: null
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
    offsetTop() {
      let { top } = this.$refs.wrapper.getBoundingClientRect();
      return { top: top + window.scrollY };
    },
    _windowScrollHandler() {
      let { top } = this.offsetTop();
      if (window.scrollY > top - this.distance) {
        let {
          height,
          left,
          width
        } = this.$refs.wrapper.getBoundingClientRect();
        this.height = height + "px";
        this.left = left + "px";
        this.width = width + "px";
        this.top = this.distance + "px";
        this.sticky = true;
      } else {
        this.height = undefined;
        this.left = undefined;
        this.width = undefined;
        this.top = undefined;
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
    z-index: 1;
  }
}
</style>
