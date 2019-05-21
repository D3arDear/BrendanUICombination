<template>
  <div class="zealot-table-wrapper">
    <table class="zealot-table" :class="{bordered,compact,striped:striped}">
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
          <th :key="column.field" v-for="column in columns">{{column.text}}</th>
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
</template>
<script>
export default {
  name: "ZealotTable",
  props: {
    striped: {
      type: Boolean,
      default: true
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
}
</style>
