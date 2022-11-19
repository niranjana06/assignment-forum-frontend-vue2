<template>
    <div>
        <div class="d-flex align-items-center p-3 my-3 text-white  rounded shadow-sm" style="background-color: #6f42c1">
            <!--      <img class="me-3" src="/docs/5.2/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38">-->
            <div class="lh-1">
                <h1 class="h6 mb-0 text-white lh-1">Pending Posts</h1>
            </div>
        </div>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <div class="list-group list-group-item rounded-3">

                <div v-if="pendingPosts.data?.length">
                    <div class="row" v-for="post in pendingPosts.data">
                        <div class="col-md-10">
                            {{post.title}}
                            <span class="d-block small opacity-50 pb-1">{{post.content}}</span>
                            <small class="opacity-50 text-nowrap">By: {{ post.user.name }} | </small>
                            <small class="opacity-50 text-nowrap">{{ post.created_at }} | </small>
                            <small class="opacity-50 text-nowrap">{{post.comments.length}} comments</small>
                        </div>
                        <div class="col-md-2 text-center">
                            <button type="button" class="btn btn-success btn-sm" :disabled="processing" @click="approvePost(post.id)">Approve</button> |
                            <button type="button" class="btn btn-danger btn-sm" :disabled="processing" @click="rejectPost(post.id)">Reject</button>
                        </div>
                        <hr class="mt-2">
                    </div>

                </div>
                <div v-else>
                    <div class="row">
                        <div class="col-md-10">
                            <span class="d-block small opacity-50 text-center">No Pending Posts</span>
                            <div class="clearfix">&nbsp;</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "PendingPostsComp",
    data(){
        return {
            processing: false
        }
    },
    computed: {
        ...mapGetters({
            pendingPosts: 'posts/allPendingPosts',
            user: 'auth/user',
            authenticated: 'auth/authenticated'
        })
    },
    methods:{
        ...mapActions({
            fetchPendingPost: 'posts/fetchPendingPosts',
            approve: 'posts/approvePost',
            reject: 'posts/rejectPost'
        }),
        async approvePost(id){
            let self = this;
            self.processing = true
            await this.approve({post_id: id, status : 'approved'}).then((response) => {
                self.processing = false
                this.$toasted.show("Post Approved!")

            }).catch((error) => {
                self.processing = false
                this.$toasted.show(error.message)
            })
        },
        async rejectPost(id){
            let self = this;
            self.processing = true
            await this.reject({post_id: id, status : 'rejected'}).then((response) => {
                self.processing = false
                this.$toasted.show("Post Rejected!")

            }).catch((error) => {
                self.processing = false
                this.$toasted.show(error.message)
            })
        }
    },
    mounted() {
        this.fetchPendingPost()
    }
}
</script>

<style scoped>

</style>
