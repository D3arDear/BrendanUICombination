<template>
  <svg class="z-icon" @click="$emit('click',$event)">
    <use v-bind:xlink:href="`#i-${name}`"></use>
  </svg>
</template>
<script>
import "./svg.js";
export default {
  name: "zealotIcon",
  props: ["name"]
};
</script>
<style lang="scss">
.z-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
