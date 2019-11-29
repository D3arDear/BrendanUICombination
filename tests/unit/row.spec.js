import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
import Vue from "vue";
import Row from "@/grid/row";
import Col from "@/grid/col";
import { mount } from "@vue/test-utils";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Row", () => {
  it("存在.", () => {
    expect(Row).to.exist;
  });
  xit("接收 gutter 属性.", done => {
    Vue.component("z-row", Row);
    Vue.component("z-col", Col);
    const wrapper = mount(Row, {
      propsData: {
        gutter: 20
      },
      slots: {
        default: `
        <z-col span="12"></z-col>
        <z-col span="12"></z-col>
        `
      }
    });
    const vm = wrapper.vm;
    vm.$nextTick(() => {
      let row = vm.$el;
      console.log(row);
      expect(row.style.marginLeft).to.eq("-10px");
      expect(row.style.marginRight).to.eq("-10px");
      let cols = vm.$el.querySelectorAll(".col");
      console.log(cols[0]);
      expect(cols[0].style.paddingRight).to.eq("10px");
      expect(cols[1].style.paddingLeft).to.eq("10px");
      done();
      vm.$el.remove();
      vm.$destroy();
    });
  });
  it("接收 align 属性", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const Constructor = Vue.extend(Row);
    const vm = new Constructor({
      propsData: {
        align: "center"
      }
    }).$mount(div);
    const element = vm.$el;
    expect(getComputedStyle(element).justifyContent).to.equal("center");
    div.remove();
    vm.$destroy();
  });
});
