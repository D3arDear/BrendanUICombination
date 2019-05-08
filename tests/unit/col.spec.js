import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)

import { shallowMount, mount } from "@vue/test-utils"
import Col from "@/grid/col.vue"

describe("Col", () => {
	it("存在.", () => {
		expect(Col).to.exist
	})

	it("接收 span 属性", () => {
		const wrapper = mount(Col, {
			propsData: {
				span: 1,
			},
		})
		const vm = wrapper.vm
		expect(vm.$el.classList.contains("col-1")).to.equal(true)
	})
	it("接收 offset 属性", () => {
		const wrapper = mount(Col, {
			propsData: {
				offset: 1,
			},
		})
		const vm = wrapper.vm
		expect(vm.$el.classList.contains("offset-1")).to.equal(true)
	})
	it("接收 pc 属性", () => {
		const wrapper = mount(Col, {
			propsData: {
				pc: { span: 1, offset: 2 },
			},
		})
		const vm = wrapper.vm
		expect(vm.$el.classList.contains("col-pc-1")).to.equal(true)
		expect(vm.$el.classList.contains("offset-pc-2")).to.equal(true)
	})
	it("接收 pad 属性", () => {
		const wrapper = mount(Col, {
			propsData: {
				pad: { span: 1, offset: 2 },
			},
		})
		const vm = wrapper.vm
		expect(vm.$el.classList.contains("col-pad-1")).to.equal(true)
		expect(vm.$el.classList.contains("offset-pad-2")).to.equal(true)
	})
	it("接收 narrow-pc 属性", () => {
		const wrapper = mount(Col, {
			propsData: {
				narrowPc: { span: 1, offset: 2 },
			},
		})
		const vm = wrapper.vm
		expect(vm.$el.classList.contains("col-narrow-pc-1")).to.equal(true)
		expect(vm.$el.classList.contains("offset-narrow-pc-2")).to.equal(true)
	})
	it("接收 wide-pc 属性", () => {
		const wrapper = mount(Col, {
			propsData: {
				widePc: { span: 1, offset: 2 },
			},
		})
		const vm = wrapper.vm
		expect(vm.$el.classList.contains("col-wide-pc-1")).to.equal(true)
		expect(vm.$el.classList.contains("offset-wide-pc-2")).to.equal(true)
	})
})
