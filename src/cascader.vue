<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :items="source" class="popover" :height="popoverHeight"></cascader-items>
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
