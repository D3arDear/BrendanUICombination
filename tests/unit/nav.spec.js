import chai, { expect } from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import Vue from "vue"
chai.use(sinonChai)

import { shallowMount, mount } from "@vue/test-utils"
import Nav from "../../src/nav/nav.vue"
import NavItem from "../../src/nav/nav-item"
import SubNav from "../../src/nav/sub-nav"

describe("nav.vue", () => {
	it("存在.", () => {
		expect(Nav).to.exist
	})
	it("支持 selected 属性", (done) => {
		Vue.component("z-nav-item", NavItem)
		Vue.component("z-sub-nav", SubNav)
		const wrapper = mount(Nav, {
			propsData: {
				selected: "home",
			},
			slots: {
				default: `
      <z-nav-item name="home">首页</z-nav-item>
      <z-sub-nav name="about">
        <template slot="title">关于</template>
        <z-nav-item name="culture">企业文化</z-nav-item>
        <z-nav-item name="developers">开发团队</z-nav-item>
      </z-sub-nav>
      <z-nav-item name="hire">招聘</z-nav-item>
        `,
			},
		})
		setTimeout(() => {
			expect(wrapper.find('[data-name="home"].selected').exists()).to.be.true
			done()
		})
	})
	it("会触发 update:selected 事件", (done) => {
		Vue.component("z-nav-item", NavItem)
		Vue.component("z-sub-nav", SubNav)
		const callback = sinon.fake()
		const wrapper = mount(Nav, {
			propsData: {
				selected: "home",
			},
			slots: {
				default: `
      <z-nav-item name="home">首页</z-nav-item>
      <z-sub-nav name="about">
        <template slot="title">关于</template>
        <z-nav-item name="culture">企业文化</z-nav-item>
        <z-nav-item name="developers">开发团队</z-nav-item>
        <z-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <z-nav-item name="wechat">微信</z-nav-item>
          <z-nav-item name="qq">QQ</z-nav-item>
          <z-sub-nav name="phone">
            <template slot="title">手机</template>
            <z-nav-item name="cm">移动</z-nav-item>
            <z-nav-item name="cu">联通</z-nav-item>
            <z-nav-item name="cn">电信</z-nav-item>
          </z-sub-nav>
        </z-sub-nav>
      </z-sub-nav>
      <z-nav-item name="hire">招聘</z-nav-item>
        `,
			},
			listeners: {
				"update:selected": callback,
			},
		})
		setTimeout(() => {
			wrapper.find('[data-name="developers"]').trigger("click")
			expect(callback).to.have.been.calledWith("developers")
			done()
		})
	})
})
