import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
chai.use(sinonChai)
import Vue from "vue"

import { shallowMount, mount } from "@vue/test-utils"
import Input from "@/input.vue"

describe("input", () => {
	// BDD 行为驱动测试
	it("存在.", () => {
		expect(Input).to.exist // 断言 Button 存在
	})
	describe("props", () => {
		const Constructor = Vue.extend(Input)
		let vm
		afterEach(() => {
			vm.$destroy()
		})
		it("接收 value", () => {
			vm = new Constructor({
				propsData: {
					value: "1234",
				},
			}).$mount()
			const inputElement = vm.$el.querySelector("input")
			expect(inputElement.value).to.equal("1234")
		})
		it("接收 disabled", () => {
			const vm = new Constructor({
				propsData: {
					disabled: true,
				},
			}).$mount()
			const inputElement = vm.$el.querySelector("input")
			expect(inputElement.disabled).to.equal(true)
		})
		it("接收 readonly", () => {
			const vm = new Constructor({
				propsData: {
					readonly: true,
				},
			}).$mount()
			const inputElement = vm.$el.querySelector("input")
			expect(inputElement.readOnly).to.equal(true)
		})
		it("接收 error", () => {
			const vm = new Constructor({
				propsData: {
					error: "这里有问题",
				},
			}).$mount()
			const useElement = vm.$el.querySelector("use")
			expect(useElement.getAttribute("xlink:href")).to.equal("#i-error")
			const errorMsg = vm.$el.querySelector(".errorMsg")
			expect(errorMsg.innerText).to.equal("这里有问题")
		})
	})
	describe("事件", () => {
		const Constructor = Vue.extend(Input)
		let vm
		afterEach(() => {
			vm.$destroy()
		})
		it("支持 change/input/focus/blur 事件", () => {
			;["change", "input", "focus", "blur"].forEach((eventName) => {
				vm = new Constructor({}).$mount()
				const callback = sinon.fake()
				vm.$on(eventName, callback)
				let event = new Event(eventName)
				Object.defineProperty(event, "target", {
					value: { value: "hi" },
					enumerable: true,
				})
				let inputElement = vm.$el.querySelector("input")
				inputElement.dispatchEvent(event)
				// 触发 input 的 change 事件
				expect(callback).to.have.been.calledWith("hi")
			})
		})
	})
})
