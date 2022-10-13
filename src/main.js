import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/reset.css";
import api from "./api/index";
import * as echarts from "echarts";

//引入mock
require("./mock/mock");

Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
