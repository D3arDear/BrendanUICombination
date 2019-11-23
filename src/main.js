import Vue from "vue";
import demo from "./demo.vue";
import plugin from "./plugin";
Vue.config.productionTip = false;

Vue.use(plugin);

new Vue({
  render: h => h(demo)
}).$mount("#app");
