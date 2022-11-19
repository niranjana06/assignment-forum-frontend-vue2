import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import products from "@/store/products";
import posts from "@/store/posts";
import comment from "@/store/comment"

Vue.use(Vuex)


export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        products,
        posts,
        comment
    }
})
