<template>
  <div style="padding-top: 16px;">
    <h2>简单用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-tabs :selected="selected">
      <z-tabs-head>
        <z-tabs-item name="1">1</z-tabs-item>
        <z-tabs-item name="2">2</z-tabs-item>
      </z-tabs-head>
      <z-tabs-body>
        <z-tabs-pane name="1">content 1</z-tabs-pane>
        <z-tabs-pane name="2">content 2</z-tabs-pane>
      </z-tabs-body>
    </z-tabs>
    <p>
      <strong>代码</strong>
    </p>
  </div>
</template>
<script>
import ZTabs from "../../../src/tabs/tabs";
import ZTabsBody from "../../../src/tabs/tabs-body";
import ZTabsHead from "../../../src/tabs/tabs-head";
import ZTabsItem from "../../../src/tabs/tabs-item";
import ZTabsPane from "../../../src/tabs/tabs-pane";

export default {
  components: { ZTabs, ZTabsBody, ZTabsHead, ZTabsItem, ZTabsPane },
  data() {
    return {
      selected: "1"
    };
  }
};
</script>