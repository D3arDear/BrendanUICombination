<template>
  <div
    class="zealot-scroll-wrapper"
    ref="parent"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="zealot-scroll" ref="child">
      <slot></slot>
    </div>
    <div class="zealot-scroll-track" v-show="scrollBarVisible">
      <div
        class="zealot-scroll-bar"
        ref="bar"
        @mousedown="onMouseDownScrollBar"
        @selectstart="onSelectStartScrollBar"
      >
        <div class="zealot-scroll-bar-inner"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ZealotScroll",
  data() {
    return {
      scrollBarVisible: false,
      isScrolling: false,
      startPosition: undefined,
      endPosition: undefined,
      translateX: 0,
      translateY: 0
    };
  },
  mounted() {
    document.addEventListener("mousemove", e => {
      this.onMouseMoveScrollBar(e);
    });
    document.addEventListener("mouseup", e => {
      this.onMouseUpScrollBar(e);
    });
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
      } else {
        e.preventDefault();
      }
      child.style.transform = `translateY(${translateY}px)`;
      this.updateScrollBar(parentHeight, childHeight, translateY);
    });
    parent.addEventListener("touchmove", e => {});
    this.updateScrollBar(parentHeight, childHeight);
  },
  methods: {
    updateScrollBar(parentHeight, childHeight, translateY) {
      let barHeight = (parentHeight * parentHeight) / childHeight;
      let bar = this.$refs.bar;
      bar.style.height = barHeight + "px";
      let y = (parentHeight * translateY) / childHeight;
      bar.style.transform = `translateY(${-y}px)`;
    },
    onMouseEnter() {
      this.scrollBarVisible = true;
    },
    onMouseLeave() {
      this.scrollBarVisible = false;
      this.isScrolling = false;
    },
    onMouseDownScrollBar(e) {
      this.isScrolling = true;
      let { screenX, screenY } = e;
      this.startPosition = { x: screenX, y: screenY };
    },
    onMouseMoveScrollBar(e) {
      if (!this.isScrolling) {
        return;
      }
      let { screenX, screenY } = e;
      this.endPosition = { x: screenX, y: screenY };
      let delta = {
        x: this.endPosition.x - this.startPosition.x,
        y: this.endPosition.y - this.startPosition.y
      };
      this.translateX = parseInt(this.translateX) + delta.x;
      this.translateY = parseInt(this.translateY) + delta.y;
      this.startPosition = this.endPosition;
      this.$refs.bar.style.transform = `translate(0px,${this.translateY}px)`;
    },
    onMouseUpScrollBar(e) {
      this.isScrolling = false;
    },
    onSelectStartScrollBar(e) {
      e.preventDefault();
    }
  }
};
</script>
<style lang="scss" scoped>
.zealot-scroll {
  transition: transform 0.05s ease;
  &-wrapper {
    overflow: hidden;
    position: absolute;
  }
  &-track {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 14px;
    background: rgba(247, 247, 247, 0.5);
    opacity: 0.8;
  }
  &-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    padding: 4px 3px;
    &-inner {
      width: 100%;
      height: 100%;
      background: #c2c2c2;
      width: 8px;
      border-radius: 4px;
      &:hover {
        background: #7d7d7d;
      }
    }
  }
}
</style>