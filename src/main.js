import Vue from "vue";
import App from "./App.vue";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import CoolLightBox from "vue-cool-lightbox";
Vue.use(CoolLightBox);

Vue.config.productionTip = false;
new Vue({
  created() {},
  render: (h) => h(App),
}).$mount("#app");
