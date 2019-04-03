<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Zealot-toast"
};
</script>
<style lang="scss">
$font-size: 14px;
$toast-height: 40px;
$toast-bg: #222020c2;
$box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
.toast {
  position: fixed;
  top: 0;
  border-radius: 2px;
  left: 50%;
  color: #eeeeee;
  padding: 0 16px;
  transform: translateX(-50%);
  font-size: $font-size;
  line-height: 1.8;
  height: $toast-height;
  display: flex;
  align-items: center;
  background: $toast-bg;
  box-shadow: $box-shadow;
}
</style>


