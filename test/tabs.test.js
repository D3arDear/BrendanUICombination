const expect = chai.expect
import Vue from "vue"
import Tabs from "../src/tabs"
import TabsHead from "../src/tabs-head"
import TabsBody from "../src/tabs-body"
import TabsItem from "../src/tabs-item"
import TabsPane from "../src/tabs-pane"

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
	it("接受 selected", done => {
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
			el: div
		})
		vm.$nextTick(() => {
			let x = vm.$el.querySelector(`.tabs-item[data-name='pc']`)
			expect(x.classList.contains("active")).to.be.true
			done()
		})
	})
})
