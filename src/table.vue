<template>
  <div class="zealot-table-wrapper">
    <table class="zealot-table" :class="{bordered,compact,striped:striped}">
      <thead>
        <tr>
          <th>
            <input type="checkbox" @change="onChangeAllItems">
          </th>
          <th v-if="numberVisible">#</th>
          <th v-for="column in columns">{{column.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item,index in dataSource">
          <td>
            <input type="checkbox" @change="onChangeItem(item,index,$event)">
          </td>
          <td v-if="numberVisible">{{ index+1 }}</td>
          <template v-for="column in columns">
            <td>{{item[column.field]}}</td>
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
      required: true
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
  methods: {
    onChangeItem(item, index, e) {
      let selected = e.target.checked;
      let copy = JSON.parse(JSON.stringify(this.selectedItems));
      if (selected) {
        copy.push(item);
      } else {
        let index = copy.indexOf(item);
        copy.splice(index, 1);
      }
      this.$emit("update:selectedItems", copy);
    },
    onChangeAllItems(e) {
      let selected = e.target.checked;
      this.$emit("update:selectedItems", selected ? this.dataSource : []);
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
