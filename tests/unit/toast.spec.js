import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
import Vue from "vue";
import Toast from "@/toast";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Toast", () => {
  // BDD 行为驱动测试
  it("存在.", () => {
    expect(Toast).to.exist; // 断言 Button 存在
  });
  describe("props", function() {
    xit("接受 autoClose", done => {
      let div = document.createElement("div");
      document.body.appendChild(div);
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          autoClose: 1
        }
      }).$mount(div);
      vm.$on("close", () => {
        expect(document.body.contains(vm.$el)).to.eq(false);
        done();
      });
      expect(vm.autoClose).to.eq(1);
    });
    it("接受 closeButton", done => {
      const callback = sinon.fake();
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          closeButton: {
            text: "关闭",
            callback: callback
          }
        }
      }).$mount();
      let closeButton = vm.$el.querySelector(".close");
      expect(closeButton.textContent.trim()).to.eq("关闭");
      setTimeout(() => {
        closeButton.click();
        expect(callback).to.have.been.called;
        done();
      }, 200);
    });
    it("接受 enableHTML", () => {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: { enableHTML: true }
      });
      vm.$slots.default = ['<strong id="test-hi">hi</strong>'];
      vm.$mount();
      let strong = vm.$el.querySelector("#test-hi");
      expect(strong).to.exist;
    });
    it("接受 position", () => {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          position: "bottom"
        }
      }).$mount();
      expect(vm.$el.classList.contains("position-bottom")).to.eq(true);
    });
  });
});
