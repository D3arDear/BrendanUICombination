<template>
  <div class="parent" ref="parent">
    <div class="child" ref="child">
      <p v-for="i in 100">{{ i }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let { parent, child } = this.$refs;
    let translateY = 0;
    let { height: childHeight } = child.getBoundingClientRect();
    let { height: parentHeight } = parent.getBoundingClientRect();
    let {
      borderTopWidth,
      borderBottomWidth,
      paddingTop,
      paddingBottom
    } = window.getComputedStyle(parent);
    borderTopWidth = parseInt(borderTopWidth);
    borderBottomWidth = parseInt(borderBottomWidth);
    paddingTop = parseInt(paddingTop);
    paddingBottom = parseInt(paddingBottom);

    let maxHeight =
      childHeight -
      parentHeight +
      (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom);
    child.style.transition = `transform .05s ease`;
    parent.addEventListener("wheel", e => {
      if (e.deltaY > 20) {
        translateY -= 20 * 3;
      } else if (e.deltaY < -20) {
        translateY -= -20 * 3;
      } else {
        translateY -= e.deltaY * 3;
      }
      if (translateY > 0) {
        translateY = 0;
      } else if (translateY < -maxHeight) {
        translateY = -maxHeight;
      }
      child.style.transform = `translateY(${translateY}px)`;
    });
    parent.addEventListener("touchmove", e => {
      console.log(e);
    });
  }
};
</script>
<style lang="scss" scoped>
.parent {
  margin: auto;
  border: 5px solid red;
  overflow: hidden;
  width: 400px;
  height: 400px;
}
.child {
  border: 5px solid green;
}
</style>