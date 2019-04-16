<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zealotCollapse"
};
</script>
<style lang="scss" scoped>
$card-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
.collapse {
  background: #fafafa;
  box-shadow: $card-shadow;
  border-radius: 2px;
}
</style>
