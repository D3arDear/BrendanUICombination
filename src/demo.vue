<template>
  <div>
    <div class="cascader-wrapper">
      <z-cascader
        :source.sync="source"
        popover-height="200px"
        :selected.sync="selectedSync"
        :load-data="loadData"
      ></z-cascader>
    </div>
    <div class="cascader-wrapper">
      <z-cascader
        :source.sync="source"
        popover-height="200px"
        :selected.sync="selectedSync"
        :load-data="loadData"
      ></z-cascader>
      <z-button icon="setting">默认样式</z-button>
    </div>
    <div class="wrapper">
      <z-slides :selected.sync="selected" height="300px">
        <z-slides-item class="box" name="1">
          <div class="slide-content">1</div>
        </z-slides-item>
        <z-slides-item class="box" name="2">
          <div class="slide-content">2</div>
        </z-slides-item>
        <z-slides-item class="box" name="3">
          <div class="slide-content">3</div>
        </z-slides-item>
      </z-slides>
    </div>
  </div>
</template>
<script>
import Button from "./button/button";
import SlidesItem from "./slides/slides-item";
import Cascader from "./cascader/cascader";
import Slides from "./slides/slides";
import db from "./db";
import { removeListener } from "./click-outside";

function ajax(parentId = 0) {
  return new Promise((success, fail) => {
    setTimeout(() => {
      let result = db.filter(item => item.parent_id === parentId);
      db.filter(item => item.parent_id == parentId);
      result.forEach(node => {
        if (db.filter(item => item.parent_id === node.id).length > 0) {
          node.isLeaf = false;
        } else {
          node.isLeaf = true;
        }
      });
      success(result);
    }, 300);
  });
}
export default {
  name: "demo",
  components: {
    "z-cascader": Cascader,
    "z-slides": Slides,
    "z-slides-item": SlidesItem,
    "z-button": Button
  },
  data() {
    return {
      selected: undefined,
      source: [],
      selectedSync: []
    };
  },
  created() {
    // let n = 1;
    // setInterval(() => {
    //   if (n === 4) {
    //     n = 1;
    //   }
    //   this.selected = n.toString();
    //   n++;
    // }, 3000);
    ajax(0).then(result => {
      this.source = result;
    });
  },
  destroyed() {
    removeListener();
  },
  methods: {
    loadData(node, fn) {
      let id = node.id;
      ajax(id).then(result => {
        fn(result); // 把cascader传给我的函数调用一下
      });
    },
    xxx() {
      ajax(this.selectedSync[0].id).then(result => {
        let lastLevelSelected = this.source.filter(
          item => item.id === this.selectedSync[0].id
        )[0];
        //lastLevelSelected.children = result;
        this.$set(lastLevelSelected, "children", result);
      });
    }
  }
};
</script>
<style lang="scss">
.box {
  height: 350px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 30px;
}
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
.slide-content {
  width: 100%;
  height: 400px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}
</style>
