
<template>
  <div class="z-nav-item" :class="{selected}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ZealotNavItem",
  inject: ["root"],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: false
    };
  },
  created() {
    this.root.addItem(this);
  },
  methods: {
    onClick() {
      this.root.namePath = [];
      this.$parent.updateNamePath && this.$parent.updateNamePath();
      this.$emit("add:selected", this.name);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../style/var";
.z-nav-item {
  padding: 10px 20px;
  position: relative;
  &.selected {
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid $blue;
      width: 100%;
    }
  }
}
.z-sub-nav .z-nav-item {
  &.selected {
    color: black;
    background: $grey;
    &::after {
      display: none;
    }
  }
}
</style>