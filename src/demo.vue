<template>
  <div style="margin:20px;">
    <div style="margin: 50px 20px;">
      <z-table bordered :columns="columns" :dataSource="dataSource" :selected-items.sync="selected"></z-table>
    </div>
    <div style="margin: 50px 20px;">
      <z-table bordered :columns="columns" :dataSource="dataSource" compact :striped="false"></z-table>
    </div>
    <z-pager :total-page="10" :current-page.sync="currentPage" :hide-if-one-page="false"></z-pager>
  </div>
</template>
<script>
import ZNav from "./nav/nav";
import ZNavItem from "./nav/nav-item";
import ZSubNav from "./nav/sub-nav";
import ZPager from "./pager";
import ZTable from "./table";
export default {
  name: "demo",
  components: { ZNav, ZNavItem, ZSubNav, ZPager, ZTable },
  data() {
    return {
      currentPage: 1,
      selected: [],
      columns: [
        { text: "姓名", field: "name" },
        { text: "分数", field: "score" }
      ],
      dataSource: [
        { id: 1, name: "Brendan", score: 100 },
        { id: 2, name: "Oracle", score: 99 },
        { id: 3, name: "Zealot", score: 98 },
        { id: 4, name: "Frank", score: 97 },
        { id: 5, name: "Jack", score: 97 },
        { id: 6, name: "Clark", score: 97 },
        { id: 8, name: "Bruce", score: 96 },
        { id: 9, name: "Peter", score: 95 },
        { id: 10, name: "Tony", score: 94 }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
