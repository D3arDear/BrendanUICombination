<template>
  <div class="col" :class="[`col-${span}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "zealotCol",
  props: {
    span: { type: [Number, String] }
  }
};
</script>

<style lang="scss" scoped>
.col {
  height: 100px;
  background: gray;
  width: 50%;
  border: 1px solid red;

  $class-prefix: col-;
  // loops through 100 times
  @for $n from 1 through 24 {
    // for each $col_#{i}
    &.#{$class-prefix}#{$n} {
      width: ($n/24) * 100%;
    }
  }
}
</style>
