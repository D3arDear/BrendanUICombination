<template>
  <div>
    <p>这里有个cascader</p>
    <z-cascader :source="source" popover-height="200px"></z-cascader>
    <p>这里有个cascader</p>
  </div>
</template>
<script>
import Cascader from "./cascader";
export default {
  name: "demo",
  components: {
    "z-cascader": Cascader
  },
  data() {
    return {
      source: [
        {
          name: "四川",
          children: [
            {
              name: "成都",
              children: [
                { name: "锦江区" },
                { name: "青羊区" },
                { name: "武侯区" },
                { name: "金牛区" }
              ]
            },
            { name: "自贡" },
            { name: "攀枝花" },
            { name: "泸州" },
            { name: "绵阳" },
            { name: "德阳" }
          ]
        },
        {
          name: "辽宁",
          children: [
            {
              name: "大连",
              children: [
                { name: "西岗区" },
                { name: "中山区" },
                { name: "沙河口区" },
                { name: "甘井子区" },
                { name: "旅顺口区" },
                { name: "金州区" },
                { name: "瓦房店市" },
                { name: "普兰店市" },
                { name: "庄河市" }
              ]
            },
            { name: "沈阳" },
            { name: "鞍山" },
            { name: "抚顺" },
            { name: "本溪" },
            { name: "丹东" },
            { name: "营口" },
            { name: "锦州" }
          ]
        },
        {
          name: "浙江",
          children: [
            {
              name: "杭州",
              children: [{ name: "上城" }, { name: "下城" }, { name: "江干" }]
            },
            {
              name: "嘉兴",
              children: [{ name: "南湖" }, { name: "秀洲" }, { name: "嘉善" }]
            }
          ]
        }
      ]
    };
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
