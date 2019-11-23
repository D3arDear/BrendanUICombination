import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
import Vue from "vue";
import Row from "@/grid/row";
import Col from "@/grid/col";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Row", () => {
  it("存在.", () => {
    expect(Row).to.exist;
  });
  it("接收 gutter 属性.", done => {
    Vue.component("z-row", Row);
    Vue.component("z-col", Col);
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = `
      <z-row gutter="20">
        <z-col span="12"></z-col>
        <z-col span="12"></z-col>
      </z-row>
    `;
    let vm = new Vue({
      el: div
    });
    console.log(vm.$el);
    setTimeout(() => {
      let row = vm.$el.querySelectorAll(".row");
      console.log(row[0]);
      expect(getComputedStyle(row[0]).marginLeft).to.eq("-10px");
      expect(getComputedStyle(row[0]).marginRight).to.eq("-10px");
      let cols = vm.$el.querySelectorAll(".col");
      expect(getComputedStyle(cols[0]).paddingRight).to.eq("10px");
      expect(getComputedStyle(cols[1]).paddingLeft).to.eq("10px");
      done();
      vm.$el.remove();
      vm.$destroy();
    }, 1000);
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
