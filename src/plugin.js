import Toast from "./toast"
export default {
	install(Vue, options) {
		Vue.prototype.$toast = function(message) {
			var Constructor = Vue.extend(Toast)
			let toast = new Constructor()
			console.log(message)
			toast.$slots.default = [message]
			toast.$mount()
			document.body.appendChild(toast.$el)
		}
	}
}
