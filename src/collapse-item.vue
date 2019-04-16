<template>
  <div class="collapseItem">
    <div class="title" @click="open=!open">{{title}}</div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zealotCollapse-item",
  props: {
    title: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      open: false
    };
  }
};
</script>
<style lang="scss" scoped>
.collapseItem {
  $background-white: #fafafa;
  > .title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    cursor: pointer;
  }
  > .content {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 8px;
  }
}
</style>
