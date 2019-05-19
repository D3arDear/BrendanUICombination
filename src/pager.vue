<template>
  <div class="zealot-pager" style="margin:20px">
    <span
      v-for="page in pages"
      :class="{active: page === currentPage,separator: page === '...'}"
      class="zealot-pager-item"
    >{{page}}</span>
  </div>
</template>

<style lang="scss" scoped>
.zealot-pager {
  font-style: normal;
  &-item {
    color: #009688;
    border-radius: 2px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 20px;
    min-height: 20px;
    padding: 4px;
    margin: 0 4px;
    cursor: pointer;
    user-select: none;
    &.separator {
      &:hover {
        user-select: none;
        cursor: auto;
      }
    }
    &.active {
      color: #009688;
      background: linear-gradient(
        0deg,
        rgba(153, 153, 153, 0.2),
        rgba(153, 153, 153, 0.2)
      );
      font-weight: bold;
    }
    &:hover {
      background: linear-gradient(
        0deg,
        rgba(153, 153, 153, 0.1),
        rgba(153, 153, 153, 0.1)
      );
    }
    &.active:hover {
      background: linear-gradient(
        0deg,
        rgba(153, 153, 153, 0.2),
        rgba(153, 153, 153, 0.2)
      );
      user-select: none;
      cursor: auto;
    }
  }
}
</style>

<script>
export default {
  name: "ZealotPager",
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    hideIfOnePage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    let pages = unique(
      [
        1,
        this.totalPage,
        this.currentPage,
        this.currentPage - 1,
        this.currentPage - 2,
        this.currentPage + 1,
        this.currentPage + 2
      ].sort((a, b) => a - b)
    ).reduce((prev, current, index, array) => {
      current > 0 && prev.push(current); // 1
      array[index + 1] !== undefined &&
        array[index + 1] - array[index] > 1 &&
        prev.push("...");
      return prev;
    }, []);

    return {
      pages: pages
    };
  }
};
function unique(array) {
  //  return [...new Set(array)];
  const object = {};
  array.map(number => {
    object[number] = true;
  });
  return Object.keys(object).map(s => parseInt(s, 10));
}
</script>
<style lang="scss" scoped>
</style>
