import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
    theme: "toasted-primary",
    position: "top-center",
    duration : 5000
})
Vue.prototype.$store = store;


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

Vue.config.productionTip = false

store.dispatch('auth/me').then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})
