import axios from 'axios'
import toast from 'vue-toasted';

export default {
    namespaced: true,

    state: {
        posts: {},
        pendingPosts: {},
        selectedPost: {},
        errors:{}
    },

    getters: {
        allApprovedPosts(state) {
            return state.posts
        },
        allPendingPosts(state) {
            return state.pendingPosts
        },
        getErrors(state){
            return state.errors
        }
    },

    mutations: {
        SET_POSTS(state, value) {
            state.posts = value
        },
        // SET_APPROVED_POSTS(state, value) {
        //     state.approvedPosts = value
        // },
        SET_PENDING_POSTS(state, value) {
            console.log('SET_PENDING_POSTS ', value);
            state.pendingPosts = value
        },
        SET_ERRORS(state, value){
            state.errors = value
        }
    },

    actions: {
        async addPost ({ dispatch, state }, payload) {

            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/posts', payload).then((res) => {
                console.log(' res >>> ', res);
            }).catch((error) => {

            })
        },
        async fetchApprovedPosts({commit}) {
            return axios.get('/api/posts').then((response) => {
                console.log('approved >>> ', response);
                commit('SET_POSTS', response.data)
            }).catch(() => {

            })
        },
        async fetchPendingPosts({commit}) {
            return axios.get('/api/pending-posts').then((response) => {
                console.log('pending >>> ', response.data.data);
                commit('SET_PENDING_POSTS', response.data)
            }).catch(() => {

            })
        },
        // async fetchUserPendingPosts({commit}, id) {
        //     return axios.get('/api/post/' + id + '/pending').then((response) => {
        //         console.log('pending >>> ', response.data.data);
        //         commit('SET_PENDING_POSTS', response.data)
        //     }).catch(() => {
        //
        //     })
        // },
        async fetchUserApprovedPosts({commit}, id) {
            return axios.get('/api/post/' + id + '/approve').then((response) => {
                console.log('pending >>> ', response.data.data);
                commit('SET_POSTS', response.data)
            }).catch(() => {

            })
        },
        async approvePost({dispatch}, payload){
            return axios.post('/api/post/approve', payload).then((response) => {
                console.log('pending >>> ', response);
                dispatch('fetchPendingPosts');
                return response;
            }).catch(() => {

            })
        },
        async rejectPost({dispatch}, payload){
            return axios.post('/api/post/reject', payload).then((response) => {
                console.log('pending >>> ', response);
                dispatch('fetchPendingPosts');
                return response;
            }).catch(() => {

            })
        },
        async deleteThisPost({dispatch, commit}, id){
            console.log('Store >>> ', id);
            await axios.get('/sanctum/csrf-cookie')
            return axios.delete('/api/post/' + id).then((response) => {
                console.log('pending >>> ', response);
                dispatch('fetchPendingPosts');
                return response;
            }).catch((errors) => {
                commit('SET_ERRORS', errors.response.data)
            })
        }
    }
}
