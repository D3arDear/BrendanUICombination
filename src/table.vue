<template>
  <div class="zealot-table-wrapper" ref="wrapper">
    <div :style="{ height, overflow: 'auto' }" ref="tableWrapper">
      <table
        class="zealot-table"
        :class="{ bordered, compact, striped: striped }"
        ref="table"
      >
        <thead>
          <tr>
            <th
              v-if="expendField"
              :style="{ width: '36px' }"
              class="zealot-table-center"
            ></th>
            <th
              v-if="checkable"
              :style="{ width: '50px' }"
              class="zealot-table-center"
            >
              <input
                type="checkbox"
                @change="onChangeAllItems"
                ref="allChecked"
                :checked="areAllItemsSelected"
              />
            </th>
            <th :style="{ width: '50px' }" v-if="numberVisible">#</th>
            <th
              :style="{ width: column.width + 'px' }"
              :key="column.field"
              v-for="column in columns"
            >
              <div class="zealot-table-header">
                {{ column.text }}
                <span
                  v-if="column.field in orderBy"
                  class="zealot-table-sorter"
                  @click="changeOrderBy(column.field)"
                >
                  <z-icon
                    name="up"
                    :class="{ active: orderBy[column.field] === 'asc' }"
                  ></z-icon>
                  <z-icon
                    name="down"
                    :class="{ active: orderBy[column.field] === 'desc' }"
                  ></z-icon>
                </span>
              </div>
            </th>
            <th v-if="$scopedSlots.default" ref="actionsHeader"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in dataSource">
            <tr :key="item.id">
              <td
                v-if="expendField"
                :style="{ width: '36px' }"
                class="zealot-table-center"
              >
                <z-icon
                  v-if="item.description"
                  :class="{ active: inExpendedIds(item.id) }"
                  class="zealot-table-expendIcon"
                  name="right"
                  @click="expendItem(item.id)"
                />
              </td>
              <td
                v-if="checkable"
                :style="{ width: '50px' }"
                class="zealot-table-center"
              >
                <input
                  type="checkbox"
                  @change="onChangeItem(item, index, $event)"
                  :checked="inSelectedItems(item)"
                />
              </td>
              <td v-if="numberVisible" :style="{ width: '50px' }">
                {{ index + 1 }}
              </td>
              <template v-for="column in columns">
                <td :style="{ width: column.width + 'px' }" :key="column.field">
                  {{ item[column.field] }}
                </td>
              </template>
              <td v-if="$scopedSlots.default">
                <div ref="actions" style="display:inline-block">
                  <slot :item="item"></slot>
                </div>
              </td>
            </tr>
            <transition name="scroll">
              <tr
                class="descriptionTr"
                v-if="inExpendedIds(item.id)"
                :key="`${item.id}-expend`"
              >
                <td
                  v-for="n in expendedCellColSpan"
                  class="descriptionHolder"
                ></td>
                <td
                  class="description"
                  :colspan="columns.length + expendedCellColSpan"
                >
                  {{ item[expendField] }}
                </td>
              </tr>
            </transition>
          </template>
        </tbody>
      </table>
    </div>
    <div class="zealot-table-loading" v-if="loading">
      <z-icon name="loading" />
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
  data() {
    return {
      expendedIDs: []
    };
  },
  props: {
    checkable: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    },
    expendField: {
      type: String
    },
    height: {
      type: Number
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
    inExpendedIds(id) {
      return this.expendedIDs.indexOf(id) >= 0;
    },
    expendItem(id) {
      if (this.inExpendedIds(id)) {
        this.expendedIDs.splice(this.expendedIDs.indexOf(id), 1);
      } else {
        this.expendedIDs.push(id);
      }
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
    let table2 = this.$refs.table.cloneNode(false);
    this.table2 = table2;
    table2.classList.add("zealot-table-copy");
    let tHead = this.$refs.table.children[0];
    let { height } = tHead.getBoundingClientRect();
    this.$refs.wrapper.style.paddingTop = height + "px";
    this.$refs.tableWrapper.style.height = this.height - height + "px";
    table2.appendChild(tHead);
    this.$refs.wrapper.appendChild(table2);
    if (this.$scopedSlots.default) {
      let div = this.$refs.actions[0];
      let { width } = div.getBoundingClientRect();
      let parent = div.parentNode;
      let style = getComputedStyle(parent);
      let paddingLeft = style.getPropertyValue("padding-left");
      let paddingRight = style.getPropertyValue("padding-Right");
      let borderLeft = style.getPropertyValue("border-left-width");
      let borderRight = style.getPropertyValue("border-right-width");
      let width2 =
        width +
        parseInt(paddingLeft) +
        parseInt(paddingRight) +
        parseInt(borderLeft) +
        parseInt(borderRight) +
        "px";
      this.$refs.actionsHeader.style.width = width2;
      this.$refs.actions.map(div => {
        div.parentNode.style.width = width2;
      });
    }
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
    },
    expendedCellColSpan() {
      let result = 0;
      if (this.checkable) {
        result += 1;
      }
      if (this.expendField) {
        result += 1;
      }
      return result;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "var";
.zealot-table {
  border-collapse: collapse;
  width: 100%;
  border-radius: $border-radius;
  border-spacing: 0;
  border-bottom: 1px solid $grey;
  tr.descriptionTr {
    transition: all 0.3s;
    td.descriptionHolder {
      border: none;
    }
    td.description {
      border: none;
    }
  }
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
  &-expendIcon {
    width: 15px;
    height: 15px;
    fill: $darker-grey;
    position: relative;
    transition: all 0.3s;
    &.active {
      transform: rotate(90deg);
    }
  }
  & &-center {
    text-align: center;
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
.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.3s;
}
.scroll-enter,
.scroll-leave-to {
  opacity: 0;
}
</style>
