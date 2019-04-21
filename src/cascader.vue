<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">{{result || '&nbsp'}}</div>

    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
        :selected="selected"
        :items="source"
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
    onUpdateSelected(newSelected) {
      this.$emit("update:selected", newSelected);
      let lastItem = newSelected[newSelected.length - 1];
      console.log(lastItem);
      console.log(this.source);
      let updateSource = result => {
        let toUpdate = this.source.filter(item => item.id === lastItem.id)[0];
        this.$set(toUpdate, "children", result);
      };
      this.loadData(lastItem, updateSource); // 调用传入的loadData
      // 调回调的时候传一个函数,这个函数理论上应该被调用
    }
  },
  computed: {
    result() {
      return this.selected.map(item => item.name).join("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
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
