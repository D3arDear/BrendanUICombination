<template>
  <div class="cascaderItem" :style="{height:height}">
    <div class="left">
      <div class="label" v-for="item in items" @click="onClickLabel(item)">
        <span class="name">{{item.name}}</span>
        <z-icon class="icon" v-if="rightArrowVisible(item)" name="right"></z-icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <zealot-cascader-items
        @update:selected="onUpdateSelected"
        :selected="selected"
        :level="level+1"
        :items="rightItems"
        :height="height"
      ></zealot-cascader-items>
    </div>
  </div>
</template>
<script>
import Icon from "./icon";
export default {
  name: "ZealotCascaderItems",
  components: { "z-icon": Icon },
  props: {
    selected: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loadData: {
      type: Function
    },
    level: {
      type: Number,
      default: 0
    },
    items: {
      type: Array
    },
    height: {
      type: String
    }
  },
  computed: {
    rightItems() {
      if (this.selected[this.level]) {
        let selected = this.items.filter(
          item => item.name === this.selected[this.level].name
        );
        if (
          selected &&
          selected[0].children &&
          selected[0].children.length > 0
        ) {
          return selected[0].children;
        }
      }
    }
  },
  methods: {
    rightArrowVisible(item) {
      return this.loadData ? !item.isLeaf : item.children;
    },
    onClickLabel(item) {
      let copy = JSON.parse(JSON.stringify(this.selected));
      copy[this.level] = item;
      copy.splice(this.level + 1);
      this.$emit("update:selected", copy);
    },
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
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
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    & {
      -ms-overflow-style: none;
    }
    & {
      overflow: -moz-scrollbars-none;
    }
  }
  .right {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    & {
      -ms-overflow-style: none;
    }
    & {
      overflow: -moz-scrollbars-none;
    }
  }
  .label {
    padding: 0.3em 1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    white-space: nowrap;
    > .name {
      margin-right: 1em;
      user-select: none;
    }
    &:hover {
      background: $border-color;
    }
    .icon {
      margin-left: auto;
      transform: scale(0.5);
      fill: $symbol-color;
    }
  }
}
</style>
