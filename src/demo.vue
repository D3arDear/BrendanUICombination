<template>
  <div>
    <z-nav :selected.sync="selected">
      <z-nav-item name="home">首页</z-nav-item>
      <z-sub-nav>
        <template slot="title">关于</template>
        <z-nav-item name="culture">企业文化</z-nav-item>
        <z-nav-item name="developers">开发团队</z-nav-item>
        <z-nav-item name="contacts">联系电话</z-nav-item>
      </z-sub-nav>
      <z-nav-item name="hire">招聘</z-nav-item>
    </z-nav>
  </div>
</template>
<script>
import ZNav from "./nav/nav";
import ZNavItem from "./nav/nav-item";
import ZSubNav from "./nav/sub-nav";
export default {
  name: "demo",
  components: { ZNav, ZNavItem, ZSubNav },
  data() {
    return {
      selected: ["culture"]
    };
  },
  created() {}
};
</script>
<style lang="scss" scoped>
</style>
