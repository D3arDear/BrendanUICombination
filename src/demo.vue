<template>
  <div>
    <z-pager :total-page="20" :current-page="3"></z-pager>
  </div>
</template>
<script>
import ZNav from "./nav/nav";
import ZNavItem from "./nav/nav-item";
import ZSubNav from "./nav/sub-nav";
import ZPager from "./pager";
export default {
  name: "demo",
  components: { ZNav, ZNavItem, ZSubNav, ZPager },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>
