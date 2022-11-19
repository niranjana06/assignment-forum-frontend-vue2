<template>
    <div>
        <div class="d-flex align-items-center p-3 my-3 text-white  rounded shadow-sm" style="background-color: #6f42c1">
            <!--      <img class="me-3" src="/docs/5.2/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38">-->
            <div class="lh-1">
                <h1 class="h6 mb-0 text-white lh-1">Dashboard</h1>
            </div>
        </div>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <div class="d-flex align-items-center p-3 my-3 rounded shadow-sm" style="background-color: #0c6251">
                <!--      <img class="me-3" src="/docs/5.2/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38">-->
                <div class="lh-1 text-white">
                    <h1 class="h6 mb-0 lh-1">All Posts</h1>
                </div>
            </div>

            <div class="list-group w-auto">

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(post, key) in approvedPosts.data" :key="post.id">
                        <th scope="row">{{ ++key }}</th>
                        <td>{{ post.title }}</td>
                        <td>
                            {{ post.content }} <br>
                            <small class="opacity-50 text-nowrap">By: {{ user.id == post.user_id ? 'You' : post.user.name }} | </small>
                            <small class="opacity-50 text-nowrap">{{ post.created_at }} | </small>
                            <small class="opacity-50 text-nowrap">{{ post.comments.length }} comments</small>
                        </td>
                        <td>
                            <span class="badge" :class="statusCheck(post.status)">{{ post.status }}</span>
                        </td>
                        <td v-if="!isAdmin || user.id == post.user_id">
                            <button type="button" class="btn btn-danger btn-sm" :disabled="processing"
                                    @click="deletePost(post.id)">Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="clearfix">&nbsp;</div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "dashboard",
    data() {
        return {
            isAdmin: false,
            processing: false
        }
    },
    computed: {
        ...mapGetters({
            approvedPosts: 'posts/allApprovedPosts',
            user: 'auth/user',
            getErrors: 'posts/getErrors'
        })
    },
    created() {
        console.log('this.user.is_admin >> ', this.user.is_admin);
        if (this.user.is_admin) {
            this.isAdmin = true;
            this.getAllPostsForAdmin();
        } else {
            this.getUserPosts();
        }

    },
    methods: {
        ...mapActions({
            fetchApprovePosts: 'posts/fetchApprovedPosts',
            // fetchPendingPosts: 'posts/fetchPendingPosts',
            // fetchUserPendingPosts: 'posts/fetchUserPendingPosts',
            fetchUserApprovedPosts: 'posts/fetchUserApprovedPosts',
            deleteThisPost: 'posts/deleteThisPost'
        }),
        statusCheck(status){
            if (status == 'approved'){
                return 'text-bg-success';
            } else if (status == 'pending') {
                return 'text-bg-warning';
            } else {
                return 'text-bg-danger';
            }
        },
        getUserPosts() {
            // this.fetchUserPendingPosts(this.user.id);
            this.fetchUserApprovedPosts(this.user.id);
        },
        getAllPostsForAdmin() {
            this.fetchApprovePosts();
        },
        async deletePost(id) {
            let self = this;
            self.processing = true
            await this.deleteThisPost(id).then((response) => {
                self.processing = false
                console.log('response >> ', response);
                if (typeof this.getErrors == "undefined") {
                    if (this.getErrors.error.code == 500) {
                        this.$toasted.show("Oops! Something went wrong.")
                    } else {
                        this.$toasted.show(this.getErrors.error.message.message)
                    }
                } else {
                    this.$toasted.show("Post Deleted!")
                }

                if (this.isAdmin) {
                    this.getAllPostsForAdmin();
                } else {
                    this.getUserPosts();
                }

            }).catch((error) => {
                self.processing = false
                this.$toasted.show(error.message)
            })
        }

    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
