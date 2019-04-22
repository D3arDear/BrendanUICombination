
import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)
const expect = chai.expect
import Vue from 'vue'
import Popover from '@/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover存在', () => {
	it('存在.', () => {
		expect(Popover).to.exist
	})
	it('可以设置position.', (done) => {
		Vue.component('z-popover', Popover)
		const div = document.createElement('div')
		document.body.appendChild(div)
		div.innerHTML = `
<z-popover position="bottom" ref="a">
<template v-slot:content>
<div>Popover content</div>
</template>
<button>Popover Bottom</button>
</z-popover>
    `
		const vm = new Vue({
			el: div,
		})
		setTimeout(() => {
			vm.$el.querySelector('button').click()
			setTimeout(() => {
				const { contentWrapper } = vm.$refs.a.$refs
				expect(contentWrapper.classList.contains('position-bottom')).to.be.true
				done()
			})
		})
	})
	xit('可以设置 trigger', (done) => {
		Vue.component('z-popover', Popover)
		const div = document.createElement('div')
		document.body.appendChild(div)
		div.innerHTML = `
<z-popover position="bottom" ref="a">
<template v-slot:content>
<div>Popover content</div>
</template>
<button>Popover Bottom</button>
</z-popover>
    `
		const vm = new Vue({
			el: div,
		})
		setTimeout(() => {
			let event = new Event('mouseenter')
			vm.$el.dispatchEvent(event)
			vm.$nextTick(() => {
				const { contentWrapper } = vm.$refs.a.$refs
				expect(contentWrapper).to.exist
				done()
			})
		}, 300)
	})
})
