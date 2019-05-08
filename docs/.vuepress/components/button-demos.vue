<template>
  <div style="padding-top: 16px;">
    <h2>简单用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-button>默认按钮</z-button>
    <z-button icon="setting">设置</z-button>
    <z-button :loading="true">加载中</z-button>
    <z-button disabled>不可用</z-button>
    <p>
      <strong>代码</strong>
    </p>
  </div>
</template>

<script>
import Button from "../../../src/button/button";
export default {
  components: {
    "z-button": Button
  },
  data() {
    return {};
  }
};
</script>
