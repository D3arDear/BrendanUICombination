<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">{{result || '&nbsp'}}</div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
        :loading-item="loadingItem"
        :selected="selected"
        :items="source"
        :loadData="loadData"
        class="popover"
        :height="popoverHeight"
        @update:selected="onUpdateSelected"
      ></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from "./cascader-items";
import Col from "../grid/col";
import { close } from "fs";
import ClickOutside from "../click-outside";
export default {
  name: "ZealotCascader",
  components: { CascaderItems },
  directives: { ClickOutside },
  props: {
    selected: {
      type: Array,
      default: () => {
        return [];
      }
    },
    source: {
      type: Array
    },
    popoverHeight: {
      type: String
    },
    loadData: {
      type: Function
    }
  },
  data() {
    return {
      popoverVisible: false,
      loadingItem: {}
    };
  },
  methods: {
    close() {
      this.popoverVisible = false;
    },
    open() {
      this.popoverVisible = true;
    },
    toggle() {
      if (this.popoverVisible === false) {
        this.open();
      } else {
        this.close();
      }
    },
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
      let lastItem = newSelected[newSelected.length - 1];
      let simple = (children, id) => {
        return children.filter(item => item.id === id)[0];
      };
      let complex = (children, id) => {
        let noChildren = [];
        let hasChildren = [];
        children.forEach(item => {
          if (item.children) {
            hasChildren.push(item);
          } else {
            noChildren.push(item);
          }
        });
        let found = simple(noChildren, id);
        if (found) {
          return found;
        } else {
          found = simple(hasChildren, id);
          if (found) {
            return found;
          } else {
            for (let i = 0; i < hasChildren.length; i++) {
              found = complex(hasChildren[i].children, id);
              if (found) {
                return found;
              }
            }
            return undefined;
          }
        }
      };
      let updateSource = result => {
        this.loadingItem = {};
        let copy = JSON.parse(JSON.stringify(this.source));
        let toUpdate = complex(copy, lastItem.id);
        toUpdate.children = result;
        this.$emit("update:source", copy);
      };
      if (!lastItem.isLeaf && this.loadData) {
        this.loadData(lastItem, updateSource); // 调用传入的loadData
        this.loadingItem = lastItem;
      }
      // 调回调的时候传一个函数,这个函数理论上应该被调用
    }
  },
  computed: {
    result() {
      return this.selected.map(item => item.name).join("/");
    }
  },
  updated() {}
};
</script>

<style lang="scss" scoped>
@import "../../style/var";
.cascader {
  display: inline-block;
  position: relative;
  .trigger {
    border: 1px solid $border-color;
    border-radius: $border-radius;
    box-shadow: $card-item-shadow;
    height: 32px;
    display: inline-flex;
    align-items: center;
    padding: 0 1em;
    min-width: 10em;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
    margin-top: 8px;
    left: 0;
    background: white;
    height: 200px;
    display: flex;
    border-radius: $border-radius;
    z-index: 1;
    @extend .card-shadow;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
