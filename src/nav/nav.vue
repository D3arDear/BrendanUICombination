<template>
  <div class="z-nav" :class="{vertical:vertical}">
    <slot></slot>
  </div>
</template>

<script>
import { Stream } from "stream";
export default {
  name: "ZealotNav",
  provide() {
    return {
      root: this,
      vertical: this.vertical
    };
  },
  props: {
    selected: {
      type: String
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      namePath: []
    };
  },
  mounted() {
    this.updateChildren();
    this.listenToChildren();
  },
  updated() {
    this.updateChildren();
  },
  computed: {},
  methods: {
    addItem(vm) {
      this.items.push(vm);
    },
    updateChildren() {
      this.items.forEach(vm => {
        if (this.selected === vm.name) {
          vm.selected = true;
        } else {
          vm.selected = false;
        }
      });
    },
    listenToChildren() {
      this.items.forEach(vm => {
        vm.$on("update:selected", name => {
          this.$emit("update:selected", name);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/var";
.z-nav {
  color: $color;
  display: flex;
  box-shadow: $card-shadow;
  background: $background-white;
  cursor: pointer;
  user-select: none;
  &.vertical {
    flex-direction: column;
  }
}
</style>
