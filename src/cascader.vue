<template>
  <div class="cascader" ref="cascader">
    <div class="trigger" @click="toggle">{{result || '&nbsp'}}</div>

    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
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
import Col from "./col";
import { close } from "fs";
export default {
  name: "ZealotCascader",
  components: { CascaderItems },
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
      popoverVisible: false
    };
  },
  methods: {
    onClickDocument(e) {
      let { cascader } = this.$refs;
      let { target } = e;
      if (cascader === target || cascader.contains(target)) {
        return;
      }
      this.close();
    },
    close() {
      this.popoverVisible = false;
      document.removeEventListener("click", this.onClickDocument);
    },
    open() {
      this.popoverVisible = true;
      this.$nextTick(() => {
        document.addEventListener("click", this.onClickDocument);
      });
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
        let copy = JSON.parse(JSON.stringify(this.source));
        let toUpdate = complex(copy, lastItem.id);
        toUpdate.children = result;
        this.$emit("update:source", copy);
      };
      if (!lastItem.isLeaf) {
        this.loadData & this.loadData(lastItem, updateSource); // 调用传入的loadData
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
@import "var";
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
    @extend .card-shadow;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
