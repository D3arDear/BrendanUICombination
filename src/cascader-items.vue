<template>
  <div class="cascaderItem" :style="{height:height}">
    <div class="left">
      <div class="label" v-for="item in items" @click="leftSelected = item">
        {{item.name}}
        <z-icon class="icon" v-if="item.children" name="right"></z-icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <zealot-cascader-items :items="rightItems" :height="height"></zealot-cascader-items>
    </div>
  </div>
</template>
<script>
import Icon from "./icon";
export default {
  name: "ZealotCascaderItems",
  components: { "z-icon": Icon },
  props: {
    items: {
      type: Array
    },
    height: {
      type: String
    }
  },
  data() {
    return {
      leftSelected: null
    };
  },
  computed: {
    rightItems() {
      if (this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children;
      } else {
        return null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "var";
.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100px;
  .left {
    height: 100%;
    padding: 0.3em 0;
    border-left: 1px solid $border-color;
  }
  .right {
    height: 100%;
  }
  .label {
    padding: 0.3em 1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 0.5em;
      transform: scale(0.5);
      fill: $symbol-color;
    }
  }
}
</style>
