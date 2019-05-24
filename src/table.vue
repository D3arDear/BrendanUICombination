<template>
  <div class="zealot-table-wrapper" ref="wrapper">
    <div :style="{height,overflow:'auto'}">
      <table class="zealot-table" :class="{bordered,compact,striped:striped}" ref="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                @change="onChangeAllItems"
                ref="allChecked"
                :checked="areAllItemsSelected"
              >
            </th>
            <th v-if="numberVisible">#</th>
            <th :key="column.field" v-for="column in columns">
              <div class="zealot-table-header">
                {{column.text}}
                <span
                  v-if="column.field in orderBy"
                  class="zealot-table-sorter"
                  @click="changeOrderBy(column.field)"
                >
                  <z-icon name="up" :class="{active:orderBy[column.field] === 'asc'}"></z-icon>
                  <z-icon name="down" :class="{active:orderBy[column.field] === 'desc'}"></z-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in dataSource" :key="item.id">
            <td>
              <input
                type="checkbox"
                @change="onChangeItem(item,index,$event)"
                :checked="inSelectedItems(item)"
              >
            </td>
            <td v-if="numberVisible">{{ index+1 }}</td>
            <template v-for="column in columns">
              <td :key="column.field">{{item[column.field]}}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="zealot-table-loading" v-if="loading">
      <z-icon name="loading"/>
    </div>
  </div>
</template>
<script>
import ZIcon from "./icon";
import { deepEqual } from "assert";
export default {
  name: "ZealotTable",
  components: {
    ZIcon
  },
  props: {
    striped: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String]
    },
    orderBy: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    compact: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true,
      validator(array) {
        if (array.filter(item => item.id === undefined).length > 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    numberVisible: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectedItems() {
      if (this.selectedItems.length === this.dataSource.length) {
        this.$refs.allChecked.indeterminate = false;
      } else if (this.selectedItems.length === 0) {
        this.$refs.allChecked.indeterminate = false;
      } else {
        this.$refs.allChecked.indeterminate = true;
      }
    }
  },
  methods: {
    updateHeadersWidth() {
      let table2 = this.table2;
      const tableWidth = this.$refs.table.getBoundingClientRect().width;
      let tableHeader = Array.from(this.$refs.table.children).filter(
        node => node.tagName.toLowerCase() === "thead"
      )[0];
      let tableHeader2;
      Array.from(table2.children).map(node => {
        if (node.tagName.toLowerCase() !== "thead") {
          node.remove();
        } else {
          tableHeader2 = node;
        }
      });
      Array.from(tableHeader.children[0].children).map((th, i) => {
        const { width } = th.getBoundingClientRect();
        const percentage = (width / tableWidth) * 100;
        tableHeader2.children[0].children[i].style.width = `${width}px`;
      });
    },
    changeOrderBy(key) {
      const copy = JSON.parse(JSON.stringify(this.orderBy));
      let oldValue = copy[key];
      if (oldValue === "asc") {
        copy[key] = "desc";
      } else if (oldValue === "desc") {
        copy[key] = true;
      } else {
        copy[key] = "asc";
      }
      this.$emit("update:orderBy", copy);
    },
    inSelectedItems(item) {
      return this.selectedItems.filter(i => i.id === item.id).length > 0;
    },
    onChangeItem(item, index, e) {
      let selected = e.target.checked;
      let copy = JSON.parse(JSON.stringify(this.selectedItems));
      if (selected) {
        copy.push(item);
      } else {
        copy = copy.filter(i => i.id !== item.id);
      }
      this.$emit("update:selectedItems", copy);
    },
    onChangeAllItems(e) {
      let selected = e.target.checked;
      this.$emit("update:selectedItems", selected ? this.dataSource : []);
    }
  },
  mounted() {
    let table2 = this.$refs.table.cloneNode(true);
    this.table2 = table2;
    table2.classList.add("zealot-table-copy");
    this.$refs.wrapper.appendChild(table2);
    this.updateHeadersWidth();
    window.addEventListener("resize", () => {
      this.updateHeadersWidth();
    });
  },
  computed: {
    areAllItemsSelected() {
      const a = this.dataSource.map(item => item.id).sort();
      const b = this.selectedItems.map(item => item.id).sort();
      if (a.length !== b.length) {
        return false;
      }
      let equal = true;
      for (let index = 0; index < a.length; index++)
        if (a[index] !== b[index]) {
          equal = false;
          break;
        }
      return equal;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../style/var";
.zealot-table {
  border-collapse: collapse;
  width: 100%;
  border-radius: $border-radius;
  border-spacing: 0;
  border-bottom: 1px solid $grey;
  &.bordered {
    border: 1px solid $grey;
    td,
    th {
      border: 1px solid $grey;
    }
  }
  &.compact {
    td,
    th {
      padding: 4px;
    }
  }
  td,
  th {
    border-bottom: 1px solid $grey;
    text-align: left;
    padding: 8px;
  }
  &.striped {
    tbody {
      > tr {
        &:nth-child(even) {
          background: white;
        }
        &:nth-child(odd) {
          background: $background-white;
        }
      }
    }
  }
  &-sorter {
    display: inline-flex;
    flex-direction: column;
    margin: 0 4px;
    cursor: pointer;

    svg.active {
      fill: red;
    }
    svg {
      width: 10px;
      height: 10px;
      fill: $darker-grey;
      &:first-child {
        position: relative;
        bottom: -1px;
      }
      &:nth-child(2) {
        position: relative;
        top: -1px;
      }
    }
  }
  &-header {
    display: flex;
    align-items: center;
  }
  &-wrapper {
    position: relative;
  }
  &-loading {
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 100px;
      height: 100px;
      @include spin;
      fill: $grey;
    }
  }
  &-copy {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
  }
}
::-webkit-scrollbar {
  width: 1px;
}
::-webkit-scrollbar-track {
  background: #f6f6f600;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #747474;
}
::-webkit-scrollbar-corner {
  background: #f6f6f6;
}
* {
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>
