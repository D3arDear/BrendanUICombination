<template>
  <div ref="wrapper" class="zealot-date-picker">
    <z-popover position="bottom" :container="popoverContainer">
      <z-input type="text" :value="formattedValue"></z-input>
      <template slot="content">
        <div class="zealot-date-picker-pop" @selectstart.prevent>
          <div class="zealot-date-picker-nav">
            <span :class="c('prevYear', 'navItem')" @click="onClickPrevYear"
              ><z-icon name="doubleLeft"></z-icon
            ></span>
            <span :class="c('prevMonth', 'navItem')" @click="onClickPrevMonth"
              ><z-icon name="left"></z-icon
            ></span>
            <span :class="c('yearAndMonth')" @click="onClickMonth">
              <span>{{ display.year }}年</span>
              <span>{{ display.month + 1 }}月</span>
            </span>
            <span :class="c('nextMonth', 'navItem')" @click="onClickNextMonth"
              ><z-icon name="right"></z-icon
            ></span>
            <span :class="c('nextYear', 'navItem')" @click="onClickNextYear"
              ><z-icon name="doubleRight"></z-icon
            ></span>
          </div>
          <div class="zealot-date-picker-panels">
            <div class="zealot-date-picker-content">
              <template v-if="mode === 'month'">
                <div :class="c('selectMonth')">
                  选择年和月
                </div>
              </template>
              <template v-else>
                <div :class="c('weekdays')">
                  <span
                    :class="c('weekday')"
                    v-for="i in [1, 2, 3, 4, 5, 6, 0]"
                    :key="i"
                  >
                    {{ weekdays[i] }}
                  </span>
                </div>
                <div :class="c('row')" v-for="i in helper.range(1, 7)" :key="i">
                  <span
                    :class="[
                      c('cell'),
                      {
                        currentMonth: isCurrentMonth(getVisibleDay(i, j))
                      }
                    ]"
                    v-for="j in helper.range(1, 8)"
                    @click="onClickCell(getVisibleDay(i, j))"
                    :key="j"
                  >
                    {{ getVisibleDay(i, j).getDate() }}
                  </span>
                </div>
              </template>
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
    firstDayOfWeek: {
      type: Number,
      default: 1
    },
    value: {
      type: Date,
      default: () => {
        return new Date();
      }
    }
  },
  data() {
    let [year, month] = helper.getYearMonthDate(this.value);
    return {
      mode: "days",
      helper: helper,
      popoverContainer: null,
      weekdays: ["日", "一", "二", "三", "四", "五", "六"],
      display: { year, month }
    };
  },
  mounted() {
    this.popoverContainer = this.$refs.wrapper;
  },
  methods: {
    onClickNextMonth() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addMonth(oldDate, 1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    onClickNextYear() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addYear(oldDate, 1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    onClickPrevMonth() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addMonth(oldDate, -1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    onClickPrevYear() {
      const oldDate = new Date(this.display.year, this.display.month);
      const newDate = helper.addYear(oldDate, -1);
      const [year, month] = helper.getYearMonthDate(newDate);
      this.display = { year, month };
    },
    onClickMonth() {
      this.mode !== "month" ? (this.mode = "month") : (this.mode = "days");
    },
    c(...classNames) {
      return classNames.map(className => `zealot-date-picker-${className}`);
    },
    getVisibleDay(row, col) {
      return this.visibleDays[(row - 1) * 7 + col - 1];
    },
    onClickCell(date) {
      if (this.isCurrentMonth(date)) {
        this.$emit("input", date);
      }
    },
    isCurrentMonth(date) {
      let [year1, month1] = helper.getYearMonthDate(date);
      return year1 === this.display.year && month1 === this.display.month;
    }
  },
  computed: {
    formattedValue() {
      const [year, month, day] = helper.getYearMonthDate(this.value);
      return `${year}-${month + 1}-${day}`;
    },
    visibleDays() {
      let date = new Date(this.display.year, this.display.month, 1);
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
    display: flex;
    background: #f8f8f8;
  }
  &-navItem {
    width: 32px;
    height: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  &-popWrapper {
    padding: 0;
  }
  &-cell,
  &-weekday {
    width: 32px;
    height: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &-cell {
    color: #ddd;
    &.currentMonth {
      color: #444;
    }
  }
  &-yearAndMonth {
    margin: auto;
  }
  &-selectMonth {
    width: 224px;
    height: 224px;
  }
  /deep/.zealot-popover-content-wrapper {
    padding: 0;
  }
}
</style>