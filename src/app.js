import Button from './button'
import ButtonGroup from './button-group'
import Cascader from './cascader'
import Col from './col'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Content from './content'
import Footer from './footer'
import Header from './header'
import Icon from './icon'
import Input from './input'
import Layout from './layout'
import normalize from 'normalize.css'
import plugin from './plugin'
import Popover from './popover'
import Row from './row'
import Sider from './sider'
import Tabs from './tabs'
import TabsBody from './tabs-body'
import TabsHead from './tabs-head'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'
import Toast from './toast'
import Vue from 'vue'
Vue.component('z-button-group', ButtonGroup)
Vue.component('z-button', Button)
Vue.component('z-cascader', Cascader)
Vue.component('z-col', Col)
Vue.component('z-collapse-item', CollapseItem)
Vue.component('z-collapse', Collapse)
Vue.component('z-content', Content)
Vue.component('z-footer', Footer)
Vue.component('z-header', Header)
Vue.component('z-icon', Icon)
Vue.component('z-input', Input)
Vue.component('z-layout', Layout)
Vue.component('z-popover', Popover)
Vue.component('z-row', Row)
Vue.component('z-sider', Sider)
Vue.component('z-tabs-body', TabsBody)
Vue.component('z-tabs-head', TabsHead)
Vue.component('z-tabs-item', TabsItem)
Vue.component('z-tabs-pane', TabsPane)
Vue.component('z-tabs', Tabs)
Vue.component('z-toast', Toast)

Vue.use(plugin)
Vue.use(normalize)

new Vue({
	el: '#app',
	data: {
		message: 'hi',
		selectedTab: '2',
		source: [
			{
				name: '四川',
				children: [
					{
						name: '成都',
						children: [{ name: '锦江区' }, { name: '青羊区' }, { name: '武侯区' }, { name: '金牛区' }],
					},
					{ name: '自贡' },
					{ name: '攀枝花' },
					{ name: '泸州' },
					{ name: '绵阳' },
					{ name: '德阳' },
				],
			},
			{
				name: '辽宁',
				children: [
					{
						name: '大连',
						children: [
							{ name: '西岗区' },
							{ name: '中山区' },
							{ name: '沙河口区' },
							{ name: '甘井子区' },
							{ name: '旅顺口区' },
							{ name: '金州区' },
							{ name: '瓦房店市' },
							{ name: '普兰店市' },
							{ name: '庄河市' },
						],
					},
					{ name: '沈阳' },
					{ name: '鞍山' },
					{ name: '抚顺' },
					{ name: '本溪' },
					{ name: '丹东' },
					{ name: '营口' },
					{ name: '锦州' },
				],
			},
			{
				name: '浙江',
				children: [
					{ name: '杭州', children: [{ name: '上城' }, { name: '下城' }, { name: '江干' }] },
					{ name: '嘉兴', children: [{ name: '南湖' }, { name: '秀洲' }, { name: '嘉善' }] },
				],
			},
		],
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
