<template>
  <div class="wrapper" :class="{error}">
    <input
      :value="value"
      type="text"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('change',$event.target.value)"
      @input="$emit('input',$event.target.value)"
      @focus="$emit('focus',$event.target.value)"
      @blur="$emit('blur',$event.target.value)"
    >
    <template v-if="error">
      <icon name="error" class="icon-error"></icon>
      <span class="errorMsg">{{error}}</span>
    </template>
  </div>
</template>
<script>
import Icon from "./icon";
export default {
  components: { Icon },
  name: "ZealotInput",
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
/* --button-height: 32px;
--font-size: 16px;
--button-bg: white;
--button-active-bg: #eee;
--border-radius: 2px;
--color: #333;
--border-color: #999;
--border-color-hover: #666; */
@import "var";
.wrapper {
  font-size: $font-size;
  display: inline-block;
  align-items: center;
  vertical-align: middle;
  &.error {
    > input {
      border-color: #ff000080;
    }
  }
  .icon-error {
    fill: #ff000080;
  }
  .errorMsg {
    color: #ff000080;
    font-size: $font-size;
  }
  > input {
    height: 32px;
    border-radius: 2px;
    border: 1px solid $border-color;
    padding: 0 8px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    background: #fafafa;
    font-size: $font-size;
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      box-shadow: inset 0 1px 3px $box-shadow-color;
      outline: none;
    }
    &[disabled],
    &[readonly] {
      border-color: rgba(0, 0, 0, 0.3);
      color: rgba(0, 0, 0, 0.5);
      cursor: not-allowed;
    }
  }
}
</style>
