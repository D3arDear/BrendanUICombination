<template>
  <div class="x">
    {{sourceItem.name}}
    <cascader-item
      v-for="item in sourceItem.children"
      v-if="sourceItem.children"
      :sourceItem="item"
    ></cascader-item>
  </div>
</template>
<script>
export default {
  name: "cascaderItem",
  props: {
    sourceItem: {
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
.x {
  border: 1px solid red;
  margin: 5px;
}
</style>
