<template>
  <div>
    <p>这里有个cascader</p>
    <z-cascader :selected.sync="selected" :source="source" popover-height="200px"></z-cascader>
    <p>这里有个cascader</p>
  </div>
</template>
<script>
import Cascader from "./cascader";
import db from "./db";
function ajax(parentId = 0) {
  return db.filter(item => item.parent_id == parentId);
}
console.log(ajax());
export default {
  name: "demo",
  components: {
    "z-cascader": Cascader
  },
  data() {
    return {
      selected: [],
      source: ajax()
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
