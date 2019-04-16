<template>
  <div>
    <z-button>默认按钮</z-button>
    <z-button icon="settings">设置</z-button>
    <z-button :loading="true">加载中</z-button>
    <z-button disabled>不可用</z-button>
  </div>
</template>

<script>
import Button from "../../../src/button";
export default {
  components: {
    "z-button": Button
  },
  data() {
    return {
      content: `
    <z-button>默认按钮</z-button>
    <z-button icon="settings">设置</z-button>
    <z-button :loading="true">加载中</z-button>
    <z-button disabled>不可用</z-button>
    `
    };
  }
};
</script>
