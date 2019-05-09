import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)
import Vue from "vue"
import Tabs from "@/tabs/tabs"
import TabsHead from "@/tabs/tabs-head"
import TabsBody from "@/tabs/tabs-body"
import TabsItem from "@/tabs/tabs-item"
import TabsPane from "@/tabs/tabs-pane"

Vue.component("z-tabs", Tabs)
Vue.component("z-tabs-head", TabsHead)
Vue.component("z-tabs-body", TabsBody)
Vue.component("z-tabs-item", TabsItem)
Vue.component("z-tabs-pane", TabsPane)
Vue.config.productionTip = false
Vue.config.devtools = false

describe("Tabs", () => {
	it("存在.", () => {
		expect(Tabs).to.exist
	})
	it("接受 selected", (done) => {
		const div = document.createElement("div")
		document.body.appendChild(div)
		div.innerHTML = `<z-tabs selected="pc">
       <z-tabs-head>
					<z-tabs-item name="pc"> 电脑 </z-tabs-item>
					<z-tabs-item name="phone"> 手机 </z-tabs-item>
					<z-tabs-item name="camera"> 相机 </z-tabs-item>
				</z-tabs-head>
				<z-tabs-body>
					<z-tabs-pane name="pc"> 电脑相关 </z-tabs-pane>
					<z-tabs-pane name="phone"> 手机相关 </z-tabs-pane>
					<z-tabs-pane name="camera"> 相机相关 </z-tabs-pane>
				</z-tabs-body>
      </z-tabs>`
		let vm = new Vue({
			el: div,
		}).$mount(div)
		vm.$nextTick(() => {
			let x = vm.$el.querySelector(`.tabs-item[data-name='pc']`)
			expect(x.classList.contains("active")).to.be.true
			done()
		})
	})
})
