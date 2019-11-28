<template>
  <div class="">
    <z-popover position="bottom">
      <z-input></z-input>
      <template slot="content">
        <div class="zealot-date-picker-pop">
          <div class="zealot-date-picker-nav">
            <span><z-icon name="setting"></z-icon></span>
            <span><z-icon name="setting"></z-icon></span>
            <span @click="onClickYear">2012年</span>
            <span @click="onClickMonth">8月</span>
            <span><z-icon name="setting"></z-icon></span>
            <span><z-icon name="setting"></z-icon></span>
          </div>
          <div class="zealot-data-picker-panels">
            <div v-if="mode === 'years'" class="zealot-date-picker-content">
              年
            </div>
            <div v-if="mode === 'months'" class="zealot-date-picker-content">
              月
            </div>
            <div v-if="mode === 'days'" class="zealot-date-picker-content">
              <div v-for="i in helper.range(1, 7)">
                <span v-for="j in helper.range(1, 8)">
                  {{ visibleDays[(i - 1) * 7 + j - 1].getDate() }}
                </span>
              </div>
            </div>
          </div>
          <div class="zealot-date-picker-actions"></div>
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
  name: "ZealotDataPicker",
  data() {
    return {
      mode: "days",
      value: new Date(),
      helper: helper
    };
  },
  mounted() {},
  methods: {
    onClickMonth() {
      this.mode = "months";
    },
    onClickYear() {
      this.mode = "years";
    }
  },
  computed: {
    visibleDays() {
      let date = this.value;
      let first = helper.firstDayOfMonth(date);
      let last = helper.lastDayOfMonth(date);
      let array = [];
      let [year, month, day] = helper.getYearMonthDate(date);
      for (let i = first.getDate(); i <= last.getDate(); i++) {
        array.push(new Date(year, month, i));
      }
      let n = first.getDay() === 0 ? 6 : first.getDay() - 1; // 0 - 6
      let array2 = [];
      for (let i = 0; i < n; i++) {
        array2.push(new Date(year, month, -i));
      }
      array2 = array2.reverse();
      let m = 42 - array.length - array2.length;
      let array3 = [];
      for (let i = 1; i <= m; i++) {
        array3.push(new Date(year, month + 1, i));
      }
      return [...array2, ...array, ...array3];
    }
  }
};
</script>
<style lang="scss" scoped>
</style>