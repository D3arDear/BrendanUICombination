import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'
import Uploader from '../../src/uploader.vue'
import http from '../../src/http'
import { doesNotReject } from 'assert'

describe('Uploader.vue', () => {
	it('存在.', () => {
		expect(Uploader).to.exist
	})
	it('可以上传一个文件', (done) => {
		// 通过stub假函数模拟
		let stub = sinon.stub(http, 'post').callsFake((url, options) => {
			setTimeout(() => {
				options.success('{"id": "123123"}')
				// expect(wrapper.find('img').exists()).to.eq(true)
				// expect(wrapper.find('img').attributes().src).to.eq('/preview/123123')
			}, 100)
		})
		const wrapper = mount(Uploader, {
			propsData: {
				name: 'file',
				action: '/upload',
				methods: 'post',
				parseResponse: (response) => {
					let obj = JSON.parse(response)
					return `/preview/${obj.id}`
				},
				fileList: [],
			},
			slots: {
				default: `<button id="x">click me</button>`,
			},
			listeners: {
				'update:fileList': (fileList) => {
					wrapper.setProps({ fileList })
				},
				uploaded: () => {
					expect(wrapper.find('use').exists()).to.eq(false)
					expect(wrapper.props().fileList[0].url).to.eq('/preview/123123')
					stub.restore()
					done()
				},
			},
		})
		wrapper.find('#x').trigger('click')
		let inputWrapper = wrapper.find('input[type="file"]')
		let input = inputWrapper.element
		// let file1 = new File(['xxxxxx'], 'xxx.txt')
		let file2 = new File(['yyyyyy'], 'yyy.txt')
		// 如何给input设置上传文件? -- DataTransfer()
		const data = new DataTransfer()
		data.items.add(file2)
		input.files = data.files
		// 不知道为什么,但是我改变了文件列表但是input没有自动触发change事件
		// 那我只能在文件列表改变后手动触发一下change事件了
		let changeEvent = new Event('change')
		input.dispatchEvent(changeEvent)
		let use = wrapper.find('use').element
		expect(use.getAttribute('xlink:href')).to.eq('#i-loading')
	})
})
