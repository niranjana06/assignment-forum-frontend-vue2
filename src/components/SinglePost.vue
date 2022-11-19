<template>
    <div class="my-3 p-3 bg-body rounded shadow-sm">
        <div class="list-group w-auto">
            <p class="h2 pb-3">Post</p>
            <router-link to="#"
                         class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <img src="https://github.com/twbs.png" alt="twbs" class="rounded-circle flex-shrink-0" width="32"
                     height="32">
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div class="col-10">
                        <h5 class="mb-0">{{ post.title }}</h5>
                        <p class="mb-0 opacity-75 pb-1">{{ post.content }}</p>
                        <small class="opacity-50 text-nowrap">By: {{ post.user.name }} | </small>
                        <small class="opacity-50 text-nowrap">{{ post.created_at }} | </small>
                        <small class="opacity-50 text-nowrap">{{post.comments.length}} comments</small>
                    </div>
                    <div class="col-2 text-center">
                        <router-link class="btn btn-primary btn-sm" v-if="!authenticated" to="/login">Add Comment</router-link>
                    </div>
                </div>
            </router-link>


            <div class="my-3 p-3">
                <div class="my-2 p-2" v-if="authenticated">
                    <form action="#" @submit.prevent="submit">
                        <div class="mb-3">
                            <label for="" class="form-label">Comment</label>
                            <textarea  :disabled="processing" rows="5" class="form-control" v-model="form.content"
                                      aria-describedby="emailHelp"></textarea>
                        </div>
                        <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                            {{ processing ? "Please wait" : "Add Comment" }}
                        </button>
                    </form>
                </div>

                <div class="d-flex align-items-center p-3 my-3 border  rounded shadow-sm">
                    <!--      <img class="me-3" src="/docs/5.2/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38">-->
                    <div class="lh-1">
                        <h1 class="h6 mb-0 text-black lh-1">Recent Comments</h1>
                    </div>
                </div>

                <div class="col-md-12" v-for="comment in post.comments">
                    <span :key="comment.id"
                                 class=" d-flex gap-3 py-3" aria-current="true">
                        <img src="https://github.com/twbs.png" alt="twbs" class="rounded-circle flex-shrink-0"
                             width="32"
                             height="32">
                        <div class="d-flex gap-2 w-100 justify-content-between">
                            <div class="col-10">
                                <strong class="d-block text-gray-dark">{{ comment.user.name }}</strong>
                                <p class="mb-0 opacity-75 pb-1">{{ comment.content }}</p>
                                <small class="opacity-50 text-nowrap">{{ comment.created_at }} | </small>
                                <a class="opacity-50 text-nowrap text-[10px]" @click="replyCommentShow(comment)">Reply</a>
                                <form action="#" @submit.prevent="replyCommentSubmit"
                                      v-if="replyCommentForm.parent_id == comment.id" :id="comment.id">
                                    <div class="mb-3">
                                        <label for="" class="form-label">Comment</label>
                                        <textarea rows="5" class="form-control" v-model="replyCommentForm.content"
                                                  aria-describedby="emailHelp"></textarea>
                                    </div>
                                    <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                        {{ processing ? "Please wait" : "Add Reply" }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </span>

                    <div class="my-1 p-2 ms-5 mb-4" v-if="comment.reply_comments_count > 0">
                        <div class="d-flex text-muted" v-for="reply in comment.reply_comments">
                            <p class="col-md-10 pb-3 mb-0 small lh-sm">
                                <strong class="d-block text-gray-dark">{{reply.user.name}}</strong>
                                {{ reply.content }}
                            </p>
                            <p class="col-md-2">
                                <small class="opacity-50 text-nowrap">{{ reply.created_at }}</small>
                            </p>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'SinglePost',
    data() {
        return {
            post: {
                user: {},
                comments: {}
            },
            post_id: null,
            user_id: null,
            form: {
                content: null
            },
            replyCommentForm: {
                parent_id: null,
                content: null
            },
            replyCommentFormStatus: [],
            processing: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            authenticated: 'auth/authenticated'
        }),
    },
    created() {
        this.fetchSinglePostWithComments(this.$route.params.id)
        this.post_id = this.$route.params.id
        this.user_id = this.authenticated ? this.user.id : null
    },
    methods: {
        ...mapActions({
            addNewComment: 'comment/addComment'
        }),
        async fetchSinglePostWithComments(id) {
            return axios.get('/api/post/' + id).then((response) => {
                console.log(response);
                this.post = response.data.data
            }).catch(() => {
            })
        },
        async submit() {
            let self = this
            self.processing = true
            this.form.post_id = self.post_id
            this.form.user_id = self.authenticated ? self.user_id : null

            // await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/post/comment', this.form).then((response) => {
                self.processing = false
                this.fetchSinglePostWithComments(this.$route.params.id)
                self.resetForm();
                this.$toasted.show("Comment added successfully!")
            }).catch((error) => {
                self.processing = false
                this.$toasted.show(error.response.data.message)
            })

            // await this.addNewComment(this.form).then((response) => {
            //     console.log('response >> ', response);
            //     self.resetForm();
            //     self.fetchSinglePostWithComments(this.$route.params.id)
            //     this.$toasted.show("Comment added successfully!")
            // }).catch((error) => {
            //     this.$toasted.show(error.message)
            // })

        },
        async replyCommentSubmit() {
            let self = this
            self.processing = true
            this.replyCommentForm.post_id = self.post_id
            this.replyCommentForm.user_id = self.user_id

            await this.addNewComment(this.replyCommentForm).then((response) => {
                self.processing = false
                this.replyCommentForm.parent_id = null
                this.replyCommentForm.content = null
                self.fetchSinglePostWithComments(this.$route.params.id)
                this.$toasted.show("Reply Comment added successfully!")
            })
            self.processing = false
        },
        replyCommentShow(comment) {
            if (!this.authenticated){
                this.$router.push('/login')
                return
            }
            this.replyCommentForm.parent_id = comment.id
        },
        resetForm() {
            let self = this;
            Object.keys(this.form).forEach(function (key, index) {
                self.form[key] = '';
            });
        },
        showForm() {
            if (!this.authenticated) {
                this.$router.push('/login');
            }
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
