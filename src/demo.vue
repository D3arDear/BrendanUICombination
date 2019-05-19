<template>
  <div style="margin:20px;">
    <z-pager :total-page="10" :current-page.sync="currentPage" :hide-if-one-page="false"></z-pager>
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
    return {
      currentPage: 1
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
