<template>
  <div class="collapseItem">
    <div class="title" @click="toggle">{{title}}</div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zealotCollapse-item",
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  inject: ["eventBus"],
  data() {
    return {
      open: false
    };
  },
  mounted() {
    this.eventBus &&
      this.eventBus.$on("update:selected", name => {
        if (name !== this.name) {
          this.close();
        } else {
          this.show();
        }
      });
  },
  methods: {
    toggle() {
      if (this.open) {
        this.open = false;
      } else {
        this.eventBus && this.eventBus.$emit("update:selected", this.name);
      }
    },
    close() {
      this.open = false;
    },
    show() {
      this.open = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.collapseItem {
  $background-white: #fafafa;
  > .title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    cursor: pointer;
  }
  > .content {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 8px;
  }
}
</style>
