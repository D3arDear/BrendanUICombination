<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  position: relative;
  .trigger {
    border: 1px solid red;
    height: 32px;
    width: 100px;
  }
  .popover-wrapper {
    position: absolute;
    top: 100%;
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
