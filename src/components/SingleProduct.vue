<template>
    <div class="my-3 p-3 bg-body rounded shadow-sm">
        <div class="list-group w-auto">
            <p class="h2 pb-3">Product</p>
            <router-link :to="'/product/'+selectedProduct.id"
                         class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <img src="https://github.com/twbs.png" alt="twbs" class="rounded-circle flex-shrink-0" width="32"
                     height="32">
                <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h5 class="mb-0">{{ selectedProduct.product_name }}</h5>
                        <p class="mb-0 opacity-75">{{ selectedProduct.product_description }}</p>
                    </div>
                    <small class="opacity-50 text-nowrap">{{ selectedProduct.created_at }}</small>
                </div>
            </router-link>


            <div class="my-3 p-3">
                <form action="#" @submit.prevent="submit" v-if="showNewPostForm">
                    <div class="mb-3">
                        <label for="" class="form-label">Post Title</label>
                        <input :disabled="processing" type="text" class="form-control" v-model="form.title">

                        <label for="" class="form-label">Content</label>
                        <textarea :disabled="processing" rows="2" class="form-control" v-model="form.content"
                                  aria-describedby="emailHelp"></textarea>
                    </div>
                    <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                        {{ processing ? "Please wait" : "Add Post" }}
                    </button>
                </form>
                <br>
                <button type="button" class="btn btn-primary" @click="showPostForm">
                    {{ showNewPostForm ? 'Close' : 'Add New Post' }}
                </button>


                <div class="d-flex align-items-center p-3 my-3 text-white  rounded shadow-sm"
                     style="background-color: #6f42c1">
                    <!--      <img class="me-3" src="/docs/5.2/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38">-->
                    <div class="lh-1">
                        <h1 class="h6 mb-0 text-white lh-1">Recent Posts</h1>
                    </div>
                </div>
                <router-link v-for="post in selectedProduct.posts_approved" :to="'/post/'+post.id" :key="post.id"
                             class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <img src="https://github.com/twbs.png" alt="twbs" class="rounded-circle flex-shrink-0" width="32"
                         height="32">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div class="col-12">
                            <h5 class="mb-0">{{ post.title }}</h5>
                            <p class="mb-0 opacity-75">{{ post.content }}</p>
                            <div class="clearfix">&nbsp;</div>

                            <small class="opacity-50 text-nowrap">By: {{ post.user.name }} | </small>
                            <small class="opacity-50 text-nowrap">{{ post.created_at }} | </small>
                            <small class="opacity-50 text-nowrap">{{ post.comments.length }} comments</small>
                        </div>
                    </div>
                </router-link>
            </div>


        </div>
    </div>
</template>


<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'SingleProduct',
    data() {
        return {
            showNewPostForm: false,
            product_id: null,
            user_id: null,
            form: {
                title: null,
                content: null,
                product_id: null,
                user_id: null,
            },
            processing: false
        }
    },
    computed: {
        ...mapGetters({
            fetchAllPosts: 'posts/allApprovedPosts',
            selectedProduct: 'products/getOneProduct',
            user: 'auth/user',
            authenticated: 'auth/authenticated'
        })
    },
    created() {
        this.fetchSingleProductWithPosts(this.$route.params.id)

        this.product_id = this.$route.params.id
        this.user_id = this.authenticated ? this.user.id : null
    },
    methods: {
        ...mapActions({
            fetchProduct: 'products/fetchOneProduct',
            addNewPost: 'posts/addPost'
        }),
        async fetchSingleProductWithPosts(id) {
            this.fetchProduct(id).then({})
        },
        showPostForm() {
            if (!this.authenticated) {
                this.$router.push('/login')
                return
            }
            this.showNewPostForm = !this.showNewPostForm
        },
        async submit() {
            let self = this
            self.processing = true

            this.form.product_id = this.product_id;
            this.form.user_id = this.user_id;

            await axios.post('/api/posts', this.form).then((res) => {
                self.resetForm();
                this.showNewPostForm = !this.showNewPostForm
                this.$toasted.show(res.data.data.message)
                self.fetchSingleProductWithPosts(this.$route.params.id)
                self.processing = false

            }).catch((error) => {
                self.processing = false
                console.log('error >>> ', error);
                this.$toasted.show(error.response.data.message)
            })
        },
        resetForm() {
            let self = this;
            Object.keys(this.form).forEach(function (key, index) {
                self.form[key] = null;
            });
        },
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
