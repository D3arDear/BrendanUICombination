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
              日
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
export default {
  components: { ZInput, ZIcon, ZPopover },
  directives: { ClickOutside },
  name: "ZealotDataPicker",
  data() {
    return {
      mode: "days" | "months" | "years",
      value: new Date()
    };
  },
  mounted() {
    let date = new Date(2018, 2, 27);
    let firstDay = date.setDate(1);
    console.log(new Date(firstDay));
    date.setMonth(date.getMonth() + 1);
    let lastDay = date.setDate(0);
    console.log(new Date(lastDay));
  },
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
      console.log(date);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>