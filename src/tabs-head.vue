<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zealotTabs-head",
  inject: ["eventBus"],
  created() {
    this.eventBus.$on("update:selected", (item, vm) => {
      console.log(item);
      console.log(vm);
    });
  }
};
</script>
<style lang="scss" scoped>
$tab-height: 40px;
$color: rgb(255, 103, 57);
.tabs-head {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid gray;
  position: relative;
  > .line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $color;
    width: 100px;
  }
  > .actions-wrapper {
    margin-left: auto;
  }
}
</style>

