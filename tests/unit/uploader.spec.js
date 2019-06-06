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
		expect(Uploader).to.exist // 断言 Button 存在
	})
	it('可以上传一个文件', (done) => {
		http.post = (url, options) => {
			setTimeout(() => {
				options.success('{"id": "123123"')
				done()
			}, 1000)
		}
		const wrapper = mount(Uploader, {
			propsData: {
				name: 'file',
				action: '/upload',
				methods: 'post',
				parseResponse: () => {},
				fileList: [],
			},
			slots: {
				default: `<button id="x">click me</button>`,
			},
			listeners: {
				'update:fileList': (fileList) => {
					wrapper.setProps({ fileList })
				},
			},
		})
		wrapper.find('#x').trigger('click')
		let inputWrapper = wrapper.find('input[type="file"]')
		let input = inputWrapper.element
		let file1 = new File(['xxxxxx'], 'xxx.txt')
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
