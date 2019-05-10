
<template>
  <div class="z-nav-item" :class="{selected}" @click="onClick">
    {{this.selected}}
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
      this.$emit("add:selected", this.name);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.z-nav-item {
  padding: 10px 20px;
  &.selected {
    background: red;
  }
}
</style>