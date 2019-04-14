<template>
  <div class="popover" @click="onClick" ref="popover">
    <div
      ref="contentWrapper"
      class="content-wrapper"
      :class="{[ `position-${position}` ]:true}"
      v-if="visible"
    >
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" style="display:inline-block">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "zealotPopover",
  data() {
    return { visible: false };
  },
  props: {
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "left", "right"].indexOf(value) >= 0;
      }
    }
  },
  methods: {
    positionContent() {
      const { contentWrapper, triggerWrapper } = this.$refs;
      document.body.appendChild(contentWrapper);
      let { width, height, top, left } = triggerWrapper.getBoundingClientRect();
      if (this.position === "top") {
        contentWrapper.style.left = left + window.scrollX + "px";
        contentWrapper.style.top = top + window.scrollY + "px";
      } else if (this.position === "bottom") {
        contentWrapper.style.left = left + window.scrollX + "px";
        contentWrapper.style.top = top + height + window.scrollY + "px";
      } else if (this.position === "left") {
        contentWrapper.style.left = left + window.scrollX + "px";
        let { height: height2 } = contentWrapper.getBoundingClientRect();
        contentWrapper.style.top =
          top + window.scrollY + (height - height2) / 2 + "px";
      } else if (this.position === "right") {
        contentWrapper.style.left = left + window.scrollX + width + "px";
        let { height: height2 } = contentWrapper.getBoundingClientRect();
        contentWrapper.style.top =
          top + window.scrollY + (height - height2) / 2 + "px";
      }
    },
    onClickDocument(e) {
      if (
        this.$refs.popover &&
        (this.$refs.popover === e.target ||
          this.$refs.popover.contains(e.target))
      ) {
        return;
      }
      if (
        this.$refs.contentWrapper &&
        (this.$refs.contentWrapper === e.target ||
          this.$refs.contentWrapper.contains(e.target))
      ) {
        return;
      }
      this.close();
    },
    close() {
      this.visible = false;
      document.removeEventListener("click", this.onClickDocument);
    },
    open() {
      this.visible = true;
      this.$nextTick(() => {
        this.positionContent();
        document.addEventListener("click", this.onClickDocument);
      });
    },
    onClick(event) {
      console.log(event.target);
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          this.close();
        } else {
          this.open();
        }
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" >
$box-shadow-color: rgba(0, 0, 0, 0.3);
$border-color: #ddd;
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  filter: drop-shadow(0 0 2px $box-shadow-color);
  max-width: 20em;
  word-break: break-all;
  padding: 0.5em 1em;
  background: white;
  &::before,
  &::after {
    content: "";
    clip-path: polygon(0% 0%, 30% 100%, 100% 0%);
    display: block;
    width: 15px;
    height: 10px;
    background: $border-color;
    position: absolute;
  }
  &.position-top {
    margin-top: -10px;
    transform: translateY(-100%);
    &::before,
    &::after {
      left: 10px;
      top: 100%;
    }
    &::after {
      background: white;
      top: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,
    &::after {
      clip-path: polygon(0% 0%, 100% 30%, 0% 100%);
      top: 5px;
      left: 100%;
      width: 10px;
      height: 15px;
    }
    &::after {
      background: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,
    &::after {
      clip-path: polygon(100% 0%, 0% 30%, 100% 100%);
      top: 5px;
      right: 100%;
      width: 10px;
      height: 15px;
    }
    &::after {
      background: white;
      right: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,
    &::after {
      bottom: 100%;
      clip-path: polygon(0% 100%, 30% 0%, 100% 100%);
    }
    &::after {
      background: white;
      bottom: calc(100% - 1px);
    }
  }
}
</style>
