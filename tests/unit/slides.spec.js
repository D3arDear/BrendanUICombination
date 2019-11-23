import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Vue from "vue";
chai.use(sinonChai);

import { shallowMount, mount } from "@vue/test-utils";
import Slides from "@/slides/slides.vue";
import SlidesItem from "@/slides/slides-item.vue";

describe("Slides", () => {
  it("存在.", () => {
    expect(Slides).to.exist;
  });
  it("接受zealotSlidesItem, 默认展示第一个", done => {
    Vue.component("ZSlidesItem", SlidesItem);
    const wrapper = mount(Slides, {
      propsData: { autoPlay: false },
      slots: {
        default: `
		  <z-slides-item name="1">
		    <div class="box1">1</div>
		  </z-slides-item>
		  <z-slides-item name="2">
		    <div class="box2">2</div>
		  </z-slides-item>
		  <z-slides-item name="3">
		    <div class="box3">3</div>
		  </z-slides-item>
        `
      }
    });
    setTimeout(() => {
      expect(wrapper.find(".box1").exists()).to.be.true;
      done();
    });
  });
  it("selected 是多少 选中的就是第几张", done => {
    Vue.component("ZSlidesItem", SlidesItem);
    const wrapper = mount(Slides, {
      propsData: { autoPlay: false, selected: "2" },
      slots: {
        default: `
		  <z-slides-item name="1">
		    <div class="box1">1</div>
		  </z-slides-item>
		  <z-slides-item name="2">
		    <div class="box2">2</div>
		  </z-slides-item>
		  <z-slides-item name="3">
		    <div class="box3">3</div>
		  </z-slides-item>
        `
      }
    });
    setTimeout(() => {
      expect(wrapper.find(".box2").exists()).to.be.true;
      done();
    });
  });
  it("点击2就展示第二个", done => {
    Vue.component("ZSlidesItem", SlidesItem);
    const wrapper = mount(Slides, {
      propsData: { autoPlay: false, selected: "1" },
      slots: {
        default: `
		  <z-slides-item name="1">
		    <div class="box1">1</div>
		  </z-slides-item>
		  <z-slides-item name="2">
		    <div class="box2">2</div>
		  </z-slides-item>
		  <z-slides-item  name="3">
		    <div class="box3">3</div>
		  </z-slides-item>
        `
      },
      listeners: {
        "update:selected": x => {
          expect(x).to.eq("2");
          done();
        }
      }
    });
    setTimeout(() => {
      wrapper.find('[data-index="1"]').trigger("click");
    });
  });
  it("会自动播放", done => {
    Vue.component("ZSlidesItem", SlidesItem);
    const callback = sinon.fake();
    const wrapper = mount(Slides, {
      propsData: { autoPlay: true, selected: "1", autoPlayDelay: 20 },
      slots: {
        default: `
		  <z-slides-item name="1">
		    <div class="box1">1</div>
		  </z-slides-item>
		  <z-slides-item name="2">
		    <div class="box2">2</div>
		  </z-slides-item>
		  <z-slides-item  name="3">
		    <div class="box3">3</div>
		  </z-slides-item>
        `
      },
      listeners: {
        "update:selected": callback
      }
    });
    setTimeout(() => {
      expect(callback).to.have.been.calledWith("2");
      done();
    }, 21);
  });
  it("可以点击下一页", done => {
    Vue.component("ZSlidesItem", SlidesItem);
    const wrapper = mount(Slides, {
      propsData: { autoPlay: false, selected: "1" },
      slots: {
        default: `
		  <z-slides-item name="1">
		    <div class="box1">1</div>
		  </z-slides-item>
		  <z-slides-item name="2">
		    <div class="box2">2</div>
		  </z-slides-item>
		  <z-slides-item  name="3">
		    <div class="box3">3</div>
		  </z-slides-item>
        `
      },
      listeners: {
        "update:selected": x => {
          expect(x).to.eq("2");
          done();
        }
      }
    });
    setTimeout(() => {
      wrapper.find(".next").trigger("click");
    });
  });
  it("可以点击上一页", done => {
    Vue.component("ZSlidesItem", SlidesItem);
    const wrapper = mount(Slides, {
      propsData: { autoPlay: false, selected: "1" },
      slots: {
        default: `
		  <z-slides-item name="1">
		    <div class="box1">1</div>
		  </z-slides-item>
		  <z-slides-item name="2">
		    <div class="box2">2</div>
		  </z-slides-item>
		  <z-slides-item  name="3">
		    <div class="box3">3</div>
		  </z-slides-item>
        `
      },
      listeners: {
        "update:selected": x => {
          expect(x).to.eq("3");
          done();
        }
      }
    });
    setTimeout(() => {
      wrapper.find(".prev").trigger("click");
    });
  });
});
