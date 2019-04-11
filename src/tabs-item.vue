<template>
  <div class="tabs-item" @click="selectTab" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zealotTabs-item",
  inject: ["eventBus"],
  data() {
    return {
      active: false
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String | Number,
      required: true
    }
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled
      };
    }
  },
  created() {
    this.eventBus.$on("update:selected", name => {
      this.active = name === this.name;
    });
  },
  methods: {
    selectTab() {
      if (this.disabled) {
        return;
      }
      this.eventBus.$emit("update:selected", this.name, this);
    }
  }
};
</script>
<style lang="scss" scoped>
$color: rgb(255, 103, 57);
$disabled-text-color: rgb(197, 197, 197);
.tabs-item {
  flex-shrink: 0;
  padding: 0 2em;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  &.active {
    color: $color;
  }
  &.disabled {
    color: $disabled-text-color;
    cursor: default;
  }
}
</style>

