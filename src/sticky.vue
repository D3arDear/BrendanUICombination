<template>
  <div class="zealot-sticky">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zealotSticky",
  props: {},
  mounted() {},
  created() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > this.top()) {
        console.log("滚过了元素的底部");
      } else {
        console.log("没有滚过元素的底部");
      }
    });
  },
  methods: {
    top() {
      let { top } = this.$refs.wrapper.getBoundingClientRect();
      return top + window.scrollY;
    }
  }
};
</script>
<style lang="scss" scoped>
.zealot-sticky {
  display: flex;
}
</style>
