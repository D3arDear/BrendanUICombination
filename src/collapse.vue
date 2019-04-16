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
    }
  },
  data() {
    return {
      eventBus: new Vue()
    };
  },
  provide() {
    if (this.single) {
      return {
        eventBus: this.eventBus
      };
    }
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
