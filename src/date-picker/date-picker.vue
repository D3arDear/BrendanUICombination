<template>
  <div ref="wrapper" class="zealot-date-picker">
    <z-popover position="bottom" :container="popoverContainer">
      <z-input></z-input>
      <template slot="content">
        <div class="zealot-date-picker-pop">
          <div class="zealot-date-picker-nav">
            <span><z-icon name="doubleLeft"></z-icon></span>
            <span><z-icon name="left"></z-icon></span>
            <span @click="onClickYear">2012年</span>
            <span @click="onClickMonth">8月</span>
            <span><z-icon name="right"></z-icon></span>
            <span><z-icon name="doubleRight"></z-icon></span>
          </div>
          <div class="zealot-date-picker-panels">
            <div v-if="mode === 'years'" class="zealot-date-picker-content">
              年
            </div>
            <div v-if="mode === 'months'" class="zealot-date-picker-content">
              月
            </div>
            <div v-if="mode === 'days'" class="zealot-date-picker-content">
              <div :class="c('weekdays')">
                <span v-for="i in [1, 2, 3, 4, 5, 6, 0]">
                  {{ weekdays[i] }}
                </span>
              </div>
              <div :class="c('row')" v-for="i in helper.range(1, 7)">
                <span :class="c('col')" v-for="j in helper.range(1, 8)">
                  {{ visibleDays[(i - 1) * 7 + j - 1].getDate() }}
                </span>
              </div>
            </div>
          </div>
          <div class="zealot-date-picker-actions">
            <button>清除</button>
          </div>
        </div>
      </template>
    </z-popover>
  </div>
</template>
<script>
import ZInput from "../input.vue";
import ZIcon from "../icon.vue";
import ClickOutside from "../click-outside";
import ZPopover from "../popover";
import helper from "./helper";
export default {
  components: { ZInput, ZIcon, ZPopover },
  directives: { ClickOutside },
  name: "ZealotDatePicker",
  props: {
    firstDayOfWeek: 0 | 1
  },
  data() {
    return {
      mode: "days",
      value: new Date(),
      helper: helper,
      weekdays: ["日", "一", "二", "三", "四", "五", "六"],
      popoverContainer: null
    };
  },
  mounted() {
    this.popoverContainer = this.$refs.wrapper;
  },
  methods: {
    onClickMonth() {
      this.mode = "months";
    },
    onClickYear() {
      this.mode = "years";
    },
    c(className) {
      return `zealot-date-picker-${className}`;
    }
  },
  computed: {
    visibleDays() {
      let date = this.value;
      let first = helper.firstDayOfMonth(date);
      let last = helper.lastDayOfMonth(date);
      let [year, month, day] = helper.getYearMonthDate(date);
      let n = first.getDay();
      let array = [];
      let x = first - (n === 0 ? 6 : n - 1) * 3600 * 24 * 1000;
      for (let i = 0; i < 42; i++) {
        array.push(new Date(x + i * 3600 * 24 * 1000));
      }
      return array;
    }
  }
};
</script>
<style lang="scss" scoped>
.zealot-date-picker {
  &-nav {
    background: red;
  }
  &-popWrapper {
    padding: 0;
  }
  /deep/.zealot-popover-content-wrapper {
    padding: 0;
  }
}
</style>