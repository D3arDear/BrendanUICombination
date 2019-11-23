
<template>
  <div class="z-sub-nav" :class="{ active, vertical }" v-click-outside="close">
    <span class="z-sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="z-sub-nav-icon" :class="{ open, vertical }">
        <z-icon name="right"></z-icon>
      </span>
    </span>
    <template v-if="vertical">
      <transition
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div class="z-sub-nav-popover" v-show="open" :class="{ vertical }">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="z-sub-nav-popover" v-show="open">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import ClickOutside from "../click-outside";
import ZIcon from "../icon";
export default {
  directives: { ClickOutside },
  components: { ZIcon },
  name: "ZealotSubNav",
  inject: ["root", "vertical"],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    active() {
      return this.root.namePath.indexOf(this.name) >= 0 ? true : false;
    }
  },
  methods: {
    enter(el, done) {
      let { height } = el.getBoundingClientRect();
      el.style.height = 0;
      // 120
      el.getBoundingClientRect();
      // 中间卡个东西让他重新计算
      el.style.height = `${height}px`;
      //多次合并赋值
      el.addEventListener("transitionend", () => {
        done();
      });
    },
    afterEnter(el) {
      el.style.height = "auto";
    },
    leave(el, done) {
      let { height } = el.getBoundingClientRect();
      el.style.height = `${height}px`;
      el.getBoundingClientRect();
      el.style.height = 0;
      el.addEventListener("transitionend", () => {
        done();
      });
    },
    afterLeave(el) {
      el.style.height = "auto";
    },
    onClick() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
    updateNamePath() {
      this.root.namePath.unshift(this.name);
      if (this.$parent.updateNamePath) {
        this.$parent.updateNamePath();
      } else {
        // this.root.namePath=[]
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";
.z-sub-nav {
  position: relative;
  &:not(.vertical) {
    &.active {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
  }
  &-label {
    padding: 10px 20px;
    display: block;
  }
  &-icon {
    display: none;
  }
  &-popover {
    margin-top: 8px;
    background: $background-white;
    position: absolute;
    top: 100%;
    left: 0;
    box-shadow: $card-item-shadow;
    white-space: nowrap;
    border-radius: $border-radius;
    font-size: $font-size-small;
    color: $color-light;
    min-width: 8em;
    transition: all 0.3s;
    &.vertical {
      position: static;
      box-shadow: none;
      border-top: 1px solid $color-splitLine;
      border-bottom: 1px solid $color-splitLine;
      transition: all 0.3s;
      overflow: hidden;
    }
  }
}
.z-sub-nav .z-sub-nav {
  &.active {
    &::after {
      display: none;
    }
  }
  .z-sub-nav-popover {
    top: 0;
    left: 100%;
    margin-left: 8px;
    &.vertical {
      margin-left: 0;
    }
  }
  .z-sub-nav-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .z-sub-nav-icon {
    display: inline-flex;
    margin-left: 1em;
    transition: transform 0.3s;
    svg {
      fill: $color-light;
    }
    &.vertical {
      transform: rotate(90deg);
      &.open {
        transform: rotate(270deg);
      }
    }
    &.open {
      transform: rotate(180deg);
    }
  }
}
</style>