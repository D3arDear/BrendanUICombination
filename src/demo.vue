<template>
  <div style="margin:20px;">
    <main style="margin: 50px 20px;">
      <z-sticky distance="100">
        <div style="border:1px solid grey">我是粘滞内容</div>
      </z-sticky>
      <div>
        <p>段落1</p>
        <p>段落2</p>
        <p>段落3</p>
        <p>段落4</p>
        <p>段落5</p>
        <p>段落6</p>
        <p>段落7</p>
        <p>段落8</p>
        <p>段落9</p>
        <p>段落10</p>
        <p>段落11</p>
        <p>段落12</p>
        <p>段落13</p>
        <p>段落14</p>
        <p>段落15</p>
        <p>段落16</p>
        <p>段落17</p>
        <p>段落18</p>
        <p>段落19</p>
        <p>段落20</p>
        <p>段落21</p>
        <p>段落22</p>
        <p>段落23</p>
        <p>段落24</p>
        <p>段落25</p>
        <p>段落26</p>
        <p>段落27</p>
        <p>段落28</p>
        <p>段落29</p>
        <p>段落30</p>
        <p>段落31</p>
        <p>段落32</p>
        <p>段落33</p>
        <p>段落34</p>
        <p>段落35</p>
        <p>段落36</p>
        <p>段落37</p>
        <p>段落38</p>
        <p>段落39</p>
        <p>段落40</p>
        <p>段落41</p>
        <p>段落42</p>
        <p>段落43</p>
        <p>段落44</p>
        <p>段落45</p>
        <p>段落46</p>
        <p>段落47</p>
        <p>段落48</p>
        <p>段落49</p>
        <p>段落50</p>
        <p>段落51</p>
        <p>段落52</p>
        <p>段落53</p>
        <p>段落54</p>
        <p>段落55</p>
        <p>段落56</p>
        <p>段落57</p>
        <p>段落58</p>
        <p>段落59</p>
        <p>段落60</p>
        <p>段落61</p>
        <p>段落62</p>
        <p>段落63</p>
        <p>段落64</p>
        <p>段落65</p>
        <p>段落66</p>
        <p>段落67</p>
        <p>段落68</p>
        <p>段落69</p>
        <p>段落70</p>
        <p>段落71</p>
        <p>段落72</p>
        <p>段落73</p>
        <p>段落74</p>
        <p>段落75</p>
        <p>段落76</p>
        <p>段落77</p>
        <p>段落78</p>
        <p>段落79</p>
        <p>段落80</p>
        <p>段落81</p>
        <p>段落82</p>
        <p>段落83</p>
        <p>段落84</p>
        <p>段落85</p>
        <p>段落86</p>
        <p>段落87</p>
        <p>段落88</p>
        <p>段落89</p>
        <p>段落90</p>
        <p>段落91</p>
        <p>段落92</p>
        <p>段落93</p>
        <p>段落94</p>
        <p>段落95</p>
        <p>段落96</p>
        <p>段落97</p>
        <p>段落98</p>
        <p>段落99</p>
        <p>段落100</p>
      </div>
    </main>

    <!-- 上面的有效 -->
    <main style="margin: 50px 20px;">
      {{error}}
      <div>只能上传 300kb 以内的 png jpeg 文件</div>
      <z-uploader
        accept="image/*"
        action="http://127.0.0.1:3000/upload"
        methods="POST"
        name="file"
        :parseResponse="parseResponse"
        :file-list.sync="fileList"
        @error="error=$event"
        :size-limit="10 * 1024 * 1024"
        multiple
      >
        <z-button icon="upload">上传</z-button>
      </z-uploader>
    </main>
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
import ZSticky from "./sticky";
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
    ZIcon,
    ZSticky
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
