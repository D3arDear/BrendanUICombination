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
      >{{n}}</span>
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
      childrenLength: 0
    };
  },
  mounted() {
    this.updateChildren();
    this.toggleAutoPlay();
    this.childrenLength = this.$children.length;
  },
  updated() {
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
        this.$emit("update:selected", this.names[newIndex]);
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
        vm.reverse = newIndex > oldIndex ? false : true;
      });
    },
    select(index) {
      console.log(index);
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
