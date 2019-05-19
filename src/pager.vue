<template>
  <div class="zealot-pager" :class="{hide:hideIfOnePage === true && totalPage <= 1}">
    <span
      class="zealot-pager-nav prev"
      :class="{disabled: currentPage === 1}"
      @click="onClickPage(currentPage-1)"
    >
      <z-icon name="left"></z-icon>
    </span>
    <template v-for="page in pages">
      <template v-if="page === currentPage">
        <span class="zealot-pager-item current">{{page}}</span>
      </template>
      <template v-else-if="page === '...'">
        <z-icon class="zealot-pager-separator" name="dots"></z-icon>
      </template>
      <template v-else>
        <span class="zealot-pager-item other" @click="onClickPage(page)">{{page}}</span>
      </template>
    </template>
    <span
      class="zealot-pager-nav next"
      :class="{disabled: currentPage === totalPage}"
      @click="onClickPage(currentPage+1)"
    >
      <z-icon name="right"></z-icon>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/var";
.zealot-pager {
  $width: 20px;
  $height: 20px;
  $font-size: 12px;
  font-style: normal;
  display: flex;
  user-select: none;
  justify-content: flex-start;
  align-items: center;
  &.hide {
    display: none;
  }
  &-nav {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: $height;
    width: $width;
    font-size: $font-size;
    margin: 0 4px;
    cursor: pointer;
    svg {
      fill: #009688;
    }
    &.disabled { cursor: default;
      svg {
        fill: $darker-grey;
      }
    }
  }
  &-separator {
    width: $width;
    font-size: $font-size;
    fill: #009688;
  }
  &-item {
    color: #009688;
    border-radius: 2px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: $width;
    height: $height;
    padding: 4px;
    margin: 0 4px;
    font-size: $font-size;
    cursor: pointer;
    &.separator {
      &:hover {
        user-select: none;
        cursor: auto;
      }
    }
    &.current {
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
    &.current:hover {
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
import ZIcon from "./icon";
export default {
  name: "ZealotPager",
  components: { ZIcon },
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
  computed: {
    pages() {
      return unique(
        [
          1,
          this.totalPage,
          this.currentPage,
          this.currentPage - 1,
          this.currentPage - 2,
          this.currentPage + 1,
          this.currentPage + 2
        ]
          .filter(n => n >= 1 && n <= this.totalPage)
          .sort((a, b) => a - b)
      ).reduce((prev, current, index, array) => {
        prev.push(current); // 1
        array[index + 1] !== undefined &&
          array[index + 1] - array[index] > 1 &&
          prev.push("...");
        return prev;
      }, []);
    }
  },
  methods: {
    onClickPage(n) {
      if (n >= 1 && n <= this.totalPage) {
        this.$emit("update:currentPage", n);
      }
    }
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
