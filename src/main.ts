import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AlertService from "@/shared/alert/alert.service";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import store from "./stores/store";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
    router,
    render: (h) => h(App),
    store,
    provide: {
        alertService: () => new AlertService(),
    }
}).$mount("#app");

