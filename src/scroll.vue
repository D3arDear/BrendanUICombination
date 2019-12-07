<template>
  <div
    class="zealot-scroll-wrapper"
    ref="parent"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @wheel="onWheel"
  >
    <div
      class="zealot-scroll"
      ref="child"
      :style="{ transform: `translateY(${this.contentY}px)` }"
    >
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
      scrollBarY: 0,
      contentY: 0,
      barHeight: undefined,
      parentHeight: undefined,
      childHeight: undefined
    };
  },
  beforeDestroy() {
    // 移除 document 的事件监听
    document.removeEventListener("mousemove", e =>
      this.onMouseMoveScrollBar(e)
    );
    document.removeEventListener("mouseup", e => this.onMouseUpScrollBar(e));
  },
  mounted() {
    this.listenToDocument();
    this.parentHeight = this.$refs.parent.getBoundingClientRect().height;
    this.childHeight = this.$refs.child.getBoundingClientRect().height;
    //  获取 maxHeight 用于限制 contentY
    this.updateScrollBar();
    parent.addEventListener("touchmove", e => {});
  },
  computed: {
    maxScrollHeight() {
      return this.parentHeight - this.barHeight;
    }
  },
  methods: {
    listenToDocument() {
      document.addEventListener("mousemove", e => this.onMouseMoveScrollBar(e));
      document.addEventListener("mouseup", e => this.onMouseUpScrollBar(e));
    },
    calculateContentYFromDeltaY(deltaY) {
      let contentY = this.contentY;
      if (deltaY > 20) {
        contentY -= 20 * 3;
      } else if (deltaY < -20) {
        contentY -= -20 * 3;
      } else {
        contentY -= deltaY * 3;
      }
      console.log(contentY);
      return contentY;
    },
    onWheel(e) {
      // 更新 contentY
      this.updateContentY(e.deltaY, () => e.preventDefault());
      // 更新 scrollBar
      this.updateScrollBar();
    },
    updateContentY(deltaY, fn) {
      let maxHeight = this.calcContentYMax();
      this.contentY = this.calculateContentYFromDeltaY(deltaY);
      if (this.contentY > 0) {
        this.contentY = 0;
      } else if (this.contentY < -maxHeight) {
        this.contentY = -maxHeight;
      } else {
        fn && fn();
      }
    },
    calcContentYMax() {
      let {
        borderTopWidth,
        borderBottomWidth,
        paddingTop,
        paddingBottom
      } = window.getComputedStyle(this.$refs.parent);
      borderTopWidth = parseInt(borderTopWidth);
      borderBottomWidth = parseInt(borderBottomWidth);
      paddingTop = parseInt(paddingTop);
      paddingBottom = parseInt(paddingBottom);
      let maxHeight =
        this.childHeight -
        this.parentHeight +
        (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom);
      return maxHeight;
    },
    updateScrollBar() {
      let { parentHeight, childHeight, contentY } = this;
      this.barHeight = (parentHeight * parentHeight) / childHeight;
      this.$refs.bar.style.height = this.barHeight + "px";
      this.scrollBarY = -(parentHeight * contentY) / childHeight;
      this.$refs.bar.style.transform = `translateY(${this.scrollBarY}px)`;
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
      this.endPosition = { x: e.screenX, y: e.screenY };
      let delta = {
        x: this.endPosition.x - this.startPosition.x,
        y: this.endPosition.y - this.startPosition.y
      };
      this.scrollBarY = this.calculateScrollBarY(delta);
      this.contentY = -(
        (this.childHeight * this.scrollBarY) /
        this.parentHeight
      );
      this.startPosition = this.endPosition;
      this.$refs.bar.style.transform = `translate(0px,${this.scrollBarY}px)`;
    },
    calculateScrollBarY(delta) {
      let newValue = parseInt(this.scrollBarY) + delta.y;
      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > this.maxScrollHeight) {
        newValue = this.maxScrollHeight;
      }
      return newValue;
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
    position: relative;
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