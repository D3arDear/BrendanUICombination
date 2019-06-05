<template>
  <div style="margin:20px;">
    <main style="margin: 50px 20px;">
      {{error}}
      <div>只能上传 300kb 以内的 png jpeg 文件</div>
      <z-uploader
        accept="image/*"
        action="http://127.0.0.1:3000/upload"
        methods="POST"
        name="files"
        :parseResponse="parseResponse"
        :file-list.sync="fileList"
        @error="error=$event"
        :size-limit="3 * 1024 * 1024"
      >
        <z-button icon="upload">上传</z-button>
      </z-uploader>
    </main>

    <!-- 上面的有效 -->
    <div style="margin: 50px 20px;">
      <z-table
        bordered
        :columns="columns"
        :dataSource="dataSource"
        :selected-items.sync="selected"
        :order-by.sync="orderBy"
        @update:orderBy="requireNewData"
        :loading="loading"
        :height="400"
        numberVisible
        checkable
        expend-field="description"
      >
        <template v-slot="{ item }">
          <z-button @click="edit(item)">编辑</z-button>
          <z-button @click="view(item)">查看</z-button>
          <z-button @click="view(item)">删除</z-button>
        </template>
      </z-table>
    </div>
    <div style="margin: 50px 20px;overflow:auto">
      <z-table
        bordered
        :columns="columns"
        :dataSource="dataSource"
        :selected-items.sync="selected"
        expend-field="description"
        compact
      ></z-table>
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
import ZButton from "./button/button";
import ZUploader from "./uploader";
import ZIcon from "./icon";
export default {
  name: "demo",
  components: {
    ZButton,
    ZNav,
    ZNavItem,
    ZSubNav,
    ZPager,
    ZTable,
    ZUploader,
    ZIcon
  },
  data() {
    return {
      error: "",
      fileList: [],
      currentPage: 1,
      selected: [],
      orderBy: {
        score: "desc",
        rank: "desc"
      },
      loading: false,
      columns: [
        { text: "姓名", field: "name" },
        { text: "分数", field: "score", width: 100 },
        { text: "排名", field: "rank", width: 100 }
      ],
      dataSource: [
        {
          id: 1,
          name: "Brendan",
          score: 100,
          rank: 1,
          description: "这个人很浮躁"
        },
        {
          id: 2,
          name: "Oracle",
          score: 99,
          rank: 2,
          description: "这个人很懒"
        },
        {
          id: 3,
          name: "Zealot",
          score: 98,
          rank: 3,
          description: "这个人很疯狂"
        },
        { id: 4, name: "Frank", score: 97, rank: 4 },
        { id: 5, name: "Jack", score: 97, rank: 5 },
        { id: 6, name: "Clark", score: 97, rank: 6 },
        { id: 8, name: "Bruce", score: 96, rank: 7 },
        { id: 9, name: "Peter", score: 95, rank: 8 },
        { id: 10, name: "Tony", score: 94, rank: 9 },
        { id: 11, name: "Brendan", score: 100, rank: 1 },
        { id: 12, name: "Oracle", score: 99, rank: 2 },
        { id: 13, name: "Zealot", score: 98, rank: 3 },
        { id: 14, name: "Frank", score: 97, rank: 4 },
        { id: 15, name: "Jack", score: 97, rank: 5 },
        { id: 16, name: "Clark", score: 97, rank: 6 },
        { id: 18, name: "Bruce", score: 96, rank: 7 },
        { id: 19, name: "Peter", score: 95, rank: 8 },
        { id: 20, name: "Tony", score: 94, rank: 9 }
      ]
    };
  },
  methods: {
    alert(error) {
      window.alert(error || "上传失败");
    },
    parseResponse(response) {
      let object = JSON.parse(response);
      let url = `http://127.0.0.1:3000/preview/${object.id}`;
      return url;
    },
    edit(item) {
      alert(`开始编辑${item.id}`);
    },
    view(item) {
      alert(`开始查看${item.id}`);
    },
    requireNewData() {
      this.loading = true;
      // ajax(url, orderBy).then(response => {
      setTimeout(() => {
        if (this.orderBy.score === "desc") {
          this.dataSource = this.dataSource.sort((a, b) => b.score - a.score);
        } else if (this.orderBy.score === "asc") {
          this.dataSource = this.dataSource.sort((a, b) => a.score - b.score);
        } else if (this.orderBy.rank === "desc") {
          this.dataSource = this.dataSource.sort((a, b) => b.score - a.score);
        } else if (this.orderBy.rank === "asc") {
          this.dataSource = this.dataSource.sort((a, b) => a.score - b.score);
        }
        this.loading = false;
      }, 1000);
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
