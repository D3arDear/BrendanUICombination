<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible"></div>
    <div class="popover" v-if="popoverVisible">
      <div class="level1">
        <div
          class="label"
          v-for="item in source"
          style="border:1px solid red"
          @click="level1Selected = item"
        >{{item.name}}</div>
      </div>
      <div class="level2">
        <div class="label" v-for="item in level2Items" @click="level2Selected = item">{{item.name}}</div>
      </div>
      <div class="level3">
        <div class="label" v-for="item in level3Items">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CascaderItem from "./cascader-item";
import Col from "./col";
export default {
  name: "ZealotCascader",
  components: { CascaderItem },
  props: {
    source: {
      type: Array
    }
  },
  data() {
    return {
      popoverVisible: false,
      level1Selected: null,
      level2Selected: null
    };
  },
  computed: {
    level2Items() {
      if (this.level1Selected) {
        return this.level1Selected.children;
      } else {
        return [];
      }
    },
    level3Items() {
      if (this.level2Selected) {
        return this.level2Selected.children;
      } else {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  .trigger {
    border: 1px solid red;
    height: 32px;
    width: 100px;
  }
  .popover {
    border: 1px solid red;
    height: 200px;
    display: flex;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
