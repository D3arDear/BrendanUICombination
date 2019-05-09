
<template>
  <div class="z-nav-item" :class="{selected}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ZealotNavItem",
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