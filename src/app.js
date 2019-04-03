import Vue from "vue"
import Button from "./button"
import Icon from "./icon"
import ButtonGroup from "./button-group"
import Input from "./input"
import Row from "./row"
import Col from "./col"
import Layout from "./layout"
import Header from "./header"
import Sider from "./sider"
import Content from "./content"
import Footer from "./footer"
import Toast from "./toast"
import plugin from "./plugin"
Vue.component("g-button", Button)
Vue.component("g-icon", Icon)
Vue.component("g-button-group", ButtonGroup)
Vue.component("g-input", Input)
Vue.component("g-row", Row)
Vue.component("g-col", Col)
Vue.component("g-layout", Layout)
Vue.component("g-header", Header)
Vue.component("g-sider", Sider)
Vue.component("g-content", Content)
Vue.component("g-footer", Footer)
Vue.component("g-toast", Toast)
Vue.use(plugin)

new Vue({
	el: "#app",
	data: {
		loading1: false,
		loading2: false,
		message: "hi"
	},
	created() {
		setTimeout(() => {
			let event = new Event("change")
			let inputElement = this.$el.querySelector("input")
			inputElement.dispatchEvent(event)
		}, 3000)
	},
	methods: {
		inputChange(e) {
			console.log(e)
		},
		showToast() {
			this.$toast("<strong>这里是message</strong>", {
				closeButton: {
					text: "关闭",
					callback(toast) {
						toast.log()
						console.log("用户说他知道了")
					}
				}
			})
		}
	}
})
