<template>
  <div
    class="col"
    :class="[span && `col-${span}`,offset && `offset-${offset}`]"
    :style="{paddingLeft:gutter/2+ 'px',paddingRight:gutter/2 + 'px'}"
  >
    <div style="border:1px solid green;height:100%;">
      <slot>1</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "zealotCol",
  data() {
    return {
      gutter: 0
    };
  },
  props: {
    span: {
      type: [Number, String]
    },
    offset: {
      type: [Number, String]
    }
  }
};
</script>

<style lang="scss" scoped>
.col {
  height: 100px;
  width: 50%;
  padding: 10px;
  $class-prefix: col-;
  // loops through 100 times
  @for $n from 1 through 24 {
    // for each $col_#{i}
    &.#{$class-prefix}#{$n} {
      width: ($n/24) * 100%;
    }
  }
  $class-prefix: offset-;
  // loops through 100 times
  @for $n from 1 through 24 {
    // for each $col_#{i}
    &.#{$class-prefix}#{$n} {
      margin-left: ($n/24) * 100%;
    }
  }
}
</style>
