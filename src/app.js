import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Sider from './sider'
import Content from './content'
import Footer from './footer'
import Toast from './toast'
import plugin from './plugin'
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'
import normalize from 'normalize.css'
import Popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
Vue.component('z-button', Button)
Vue.component('z-icon', Icon)
Vue.component('z-button-group', ButtonGroup)
Vue.component('z-input', Input)
Vue.component('z-row', Row)
Vue.component('z-col', Col)
Vue.component('z-layout', Layout)
Vue.component('z-header', Header)
Vue.component('z-sider', Sider)
Vue.component('z-content', Content)
Vue.component('z-footer', Footer)
Vue.component('z-toast', Toast)
Vue.component('z-tabs', Tabs)
Vue.component('z-tabs-head', TabsHead)
Vue.component('z-tabs-body', TabsBody)
Vue.component('z-tabs-item', TabsItem)
Vue.component('z-tabs-pane', TabsPane)
Vue.component('z-popover', Popover)
Vue.component('z-collapse', Collapse)
Vue.component('z-collapse-item', CollapseItem)
Vue.use(plugin)
Vue.use(normalize)

new Vue({
	el: '#app',
	data: {
		loading1: false,
		loading2: false,
		message: 'hi',
		selectedTab: '2',
	},
	created() {
		setTimeout(() => {
			let event = new Event('change')
			let inputElement = this.$el.querySelector('input')
			inputElement.dispatchEvent(event)
		}, 3000)
	},
	methods: {
		inputChange(e) {
			console.log(e)
		},
		showToastT() {
			this.showToast('top')
		},
		showToastM() {
			this.showToast('middle')
		},
		showToastB() {
			this.showToast('bottom')
		},
		showToast(position) {
			this.$toast(`<strong style="color:red;">${parseInt(Math.random() * 100)}</strong> 个 message 未读`, {
				enableHTML: true,
				position,
				closeButton: {
					text: '关闭',
					callback(toast) {
						toast.log()
						console.log('用户说他知道了')
					},
				},
				autoClose: 3,
			})
		},
	},
})
