<template>
  <div class="z-slides">
    <div class="z-slides-window" ref="window">
      <div class="z-slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="z-slides-dots">
      <span
        v-for="n in childrenLength"
        :class="{active: selectedIndex === n-1}"
        @click="select(n-1)"
      >{{n-1}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "zealotSlides",
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      childrenLength: 0,
      lastSelectedIndex: undefined
    };
  },
  mounted() {
    // this.updateChildren();
    // this.toggleAutoPlay();
    this.childrenLength = this.$children.length;
    this.lastSelectedIndex = this.selectedIndex;
  },
  updated() {
    console.log("this.lastSelectedIndex");
    console.log(this.lastSelectedIndex);
    console.log("this.selectedIndex");
    console.log(this.selectedIndex);
    this.updateChildren();
  },
  computed: {
    selectedIndex() {
      return this.names.indexOf(this.selected) || 0;
    },
    names() {
      return this.$children.map(vm => vm.name);
    }
  },
  methods: {
    toggleAutoPlay() {
      let index = this.names.indexOf(this.getSelected());
      let run = () => {
        let newIndex = index - 1;
        if (newIndex === -1) {
          newIndex = this.names.length - 1;
        }
        if (newIndex === this.names.length) {
          newIndex = 0;
        }
        this.select(newIndex);
        setTimeout(run, 2000);
      };
      setTimeout(run, 2000);
    },
    getSelected() {
      let first = this.$children[0];
      return this.selected || first.name;
    },
    updateChildren() {
      let selected = this.getSelected();
      this.$children.forEach(vm => {
        vm.selected = this.selected;
        let newIndex = this.names.indexOf(selected);
        let oldIndex = this.names.indexOf(vm.name);
        console.log(`last + ${this.lastSelectedIndex}`);
        console.log(`current + ${this.selectedIndex}`);
        vm.reverse = this.selectedIndex > this.lastSelectedIndex ? false : true;
        this.$nextTick(() => {
          vm.selected = selected;
        });
      });
    },
    select(index) {
      this.lastSelectedIndex = this.selectedIndex;
      this.$emit("update:selected", this.names[index]);
    }
  }
};
</script>
<style lang="scss" scoped>
.z-slides {
  border: 1px solid grey;
  &-window {
    overflow: hidden;
  }
  &-wrapper {
    position: relative;
  }
  &-dots {
    > span {
      padding: 10px;
      &.active {
        background: red;
      }
    }
  }
}
</style>
