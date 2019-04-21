<template>
  <div>
    <p>这里有个cascader</p>
    <z-cascader
      :source="source"
      popover-height="200px"
      :selected.sync="selected"
      :load-data="loadData"
    ></z-cascader>
    <p>这里有个cascader</p>
  </div>
</template>
<script>
import Cascader from "./cascader";
import db from "./db";

function ajax(parentId = 0) {
  return new Promise((success, fail) => {
    setTimeout(() => {
      let result = db.filter(item => item.parent_id === parentId);
      success(result);
    }, 300);
  });
}

export default {
  name: "demo",
  components: {
    "z-cascader": Cascader
  },
  data() {
    return {
      selected: [],
      source: []
    };
  },
  created() {
    ajax(0).then(result => {
      this.source = result;
    });
  },
  
  methods: {
    loadData(node, fn) {
      let id = node.id;
      ajax(id).then(result => {
        fn(result); // 把cascader传给我的函数调用一下
      });
    },
    xxx() {
      ajax(this.selected[0].id).then(result => {
        let lastLevelSelected = this.source.filter(
          item => item.id === this.selected[0].id
        )[0];
        //lastLevelSelected.children = result;
        this.$set(lastLevelSelected, "children", result);
        console.log(lastLevelSelected);
      });
    }
  }
};
</script>
<style lang="scss">
img {
  max-width: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  --font-size: 14px;
}
body {
  font-size: var(--font-size);
}
</style>
