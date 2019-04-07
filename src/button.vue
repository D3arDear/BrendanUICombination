<template>
  <button
    class="z-button"
    :class="{ [`icon-${iconposition}`]: true }"
    @click="$emit('click')"
  >
    <z-icon class="icon loading" name="loading" v-if="loading"></z-icon>
    <z-icon class="icon" v-if="icon && !loading" :name="icon"></z-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Vue from "vue";
import Icon from "./icon";
Vue.component("z-icon", Icon);
export default {
  name: "zealotButton",
  props: {
    icon: {},
    loading: {
      type: Boolean,
      default: false
    },
    iconposition: {
      type: String,
      default: "left",
      validator(value) {
        return value === "left" || value === "right";
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.z-button {
  font-size: var(--font-size);
  height: var(--button-height);
  padding: 0 1em;
  font: inherit;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--button-bg);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  &:hover {
    border-color: var(--border-color-hover);
  }
  &:active {
    background-color: var(--button-active-bg);
  }
  &:focus {
    outline: none;
  }
  > .icon {
    order: 1;
    margin-right: 0.1em;
    margin-left: 0;
    fill: #636363;
  }
  > .content {
    order: 2;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-family: arial, sans-serif;
  }
  &.icon-right {
    > .icon {
      order: 2;
      margin-left: 0.1em;
      margin-right: 0;
    }
    > .content {
      order: 1;
    }
  }
  .loading {
    animation: spin 2s infinite linear;
    fill: #acacac;
  }
}
</style>
