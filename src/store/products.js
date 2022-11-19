import axios from 'axios'

export default {
    namespaced: true,

    state: {
        products: {},
        product: {}
    },

    getters: {
        getAllProducts(state) {
            return state.products
        },
        getOneProduct(state) {
            return state.product
        },

    },

    mutations: {
        SET_ALL_PRODUCTS(state, value) {
            console.log('value >>> ',value);
            state.products = value
        },
        SET_PRODUCT(state, value) {
            console.log('value >>> ',value);
            state.product = value
        }
    },

    actions: {
        fetchProducts ({ commit }) {
            return axios.get('/api/products').then((response) => {
                commit('SET_ALL_PRODUCTS', response.data.data)
            }).catch(() => {
                commit('SET_ALL_PRODUCTS', {})
            })
        },
        fetchOneProduct ({ commit }, id) {
            return axios.get('/api/product/' + id).then((response) => {
                commit('SET_PRODUCT', response.data)
            }).catch(() => {
                commit('SET_PRODUCT', {})
            })
        }
    }
}
