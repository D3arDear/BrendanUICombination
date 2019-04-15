const expect = chai.expect
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover存在', () => {
	// BDD 行为驱动测试

	it('存在.', (done) => {
		expect(Popover).to.exist // 断言 Button 存在
	})
	it('可以设置position.', () => {
		const Constructor = Vue.extend(Button)
		const vm = new Constructor({
			propsData: {
				position: 'settings',
			},
		}).$mount()

		const useElement = vm.$el.querySelector('use')
		expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')
		vm.$destroy()
	})
})
