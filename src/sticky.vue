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
    let { top } = this.top();
    window.addEventListener("scroll", () => {
      if (window.scrollY > top) {
        console.log("滚过了元素的底部");
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
        console.log("没有滚过元素的底部");
        this.sticky = false;
      }
    });
  },
  created() {},
  watch() {},
  methods: {
    top() {
      let { top } = this.$refs.wrapper.getBoundingClientRect();
      return { top: top + window.scrollY };
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
