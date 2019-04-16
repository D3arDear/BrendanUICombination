<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "zealotCollapse",
  props: {
    single: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String
    }
  },
  data() {
    return {
      eventBus: new Vue()
    };
  },
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  mounted() {
    this.eventBus.$emit("update:selected", this.selected);
    this.eventBus.$on("update:selected", name => {
      this.$emit("update:selected", name);
    });
  }
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
