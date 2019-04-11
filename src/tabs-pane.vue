<template>
  <div class="tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zealotTbas-pane",
  inject: ["eventBus"],
  data() {
    return {
      active: false
    };
  },
  props: {
    name: String | Number,
    require: true
  },
  computed: {
    classes() {
      return {
        active: this.active
      };
    }
  },
  created() {
    this.eventBus.$on("update:selected", name => {
      this.active = name === this.name;
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.tabs-pane {
  &.active {
    background: red;
  }
}
</style>

