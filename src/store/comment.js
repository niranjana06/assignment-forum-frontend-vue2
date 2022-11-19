import axios from 'axios'

export default {
    namespaced: true,

    state: {
        comments: null,
    },

    getters: {
        getAllComments(state) {
            return state.comments
        },

    },

    mutations: {
        SET_ALL_COMMENTS(state, value) {
            console.log('value >>> ', value);
            state.comments = value
        }
    },

    actions: {
        async addComment({commit}, payload) {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/post/comment', payload).then((response) => {
                commit('SET_ALL_COMMENTS', response.data.data)
            }).catch(() => {
                commit('SET_ALL_COMMENTS', null)
            })
        },
    }
}
