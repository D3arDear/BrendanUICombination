<template>
  <div style="margin:20px;">
    <main style="margin: 50px 20px;display:flex; justify-content:center;">
      <div style="width:600px;border:1px solid black">
        <z-sticky :distance="100">
          <div style="border:1px solid grey">我是粘滞内容</div>
        </z-sticky>
      </div>
    </main>
    <!-- 下面的有效 -->
    <z-date-picker
      :value="d"
      @input="d = $event"
      :scope="scope"
    ></z-date-picker>
    <!-- 上面的有效 -->
    <main style="margin: 50px 20px;">
      {{ error }}
      <div>只能上传 300kb 以内的 png jpeg 文件</div>
      <z-uploader
        accept="image/*"
        action="http://127.0.0.1:3000/upload"
        methods="POST"
        name="file"
        :parseResponse="parseResponse"
        :file-list.sync="fileList"
        @error="error = $event"
        :size-limit="10 * 1024 * 1024"
        multiple
      >
        <z-button icon="upload">上传</z-button>
      </z-uploader>
    </main>
    <div style="margin: 50px 20px;">
      <z-table
        bordered
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
        <z-table-column text="姓名" field="name" :width="200">
          <template slot-scope="props">
            <a :href="`/users/${props.value}`">{{ props.value }}</a>
          </template>
        </z-table-column>
        <z-table-column text="分数" field="score" :width="300">
        </z-table-column>
      </z-table>
    </div>
    <z-pager
      :total-page="10"
      :current-page.sync="currentPage"
      :hide-if-one-page="false"
    ></z-pager>
    <div>
      其他内容
      <z-scroll style="height:400px;width:400px;margin:auto;">
        <p style="margin:0;" v-for="i in 100">{{ i }}</p>
      </z-scroll>
    </div>
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
import ZSticky from "./sticky";
import ZTableColumn from "./table-column";
import ZDatePicker from "./date-picker/date-picker.vue";
import ZScroll from "./scroll.vue";
export default {
  name: "demo",
  components: {
    ZDatePicker,
    ZTableColumn,
    ZButton,
    ZNav,
    ZNavItem,
    ZSubNav,
    ZPager,
    ZTable,
    ZUploader,
    ZIcon,
    ZSticky,
    ZScroll
  },
  data() {
    return {
      error: "",
      fileList: [],
      currentPage: 1,
      selected: [],
      d: new Date(),
      scope: [new Date(1959, 1), new Date(2019, 6)],
      orderBy: {
        score: "desc",
        rank: "desc"
      },
      loading: false,
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
