<template>
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Register</h1>
                        <hr/>

                        <form action="#"  @submit.prevent="registerUser">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input type="text" name="name" v-model="user.name" id="name" placeholder="Enter name" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="text" name="name" v-model="user.email" id="email" placeholder="Enter Email" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" v-model="user.password" class="form-control" id="exampleInputPassword1">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">User Type</label>
                                <select class="form-control" v-model="user.is_admin">
                                    <option value="0" selected>User</option>
                                    <option value="1">Admin</option>
                                </select>
                            </div>

                            <button type="submit" :disabled="processing" class="btn btn-primary">
                                {{ processing ? "Please wait" : "Register" }}
                            </button>
                            <div class="col-12 text-center">
                                <label>Already have an account?
                                    <router-link :to="{name:'login'}">Login Now!</router-link>
                                </label>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'register',
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                is_admin: 0
            },
            processing: false
        }
    },
    methods: {
        ...mapActions({
            signIn: 'auth/signIn',
            register: 'auth/registerUser'
        }),
        async registerUser() {
            this.processing = true

            await this.register(this.user).then(response => {
                this.signIn(this.user)
            }).catch(({response: {data}}) => {
                alert(data.message)
            }).finally(() => {
                this.processing = false
                this.$router.replace({name: 'home'})
            })
        }
    }
}
</script>

<style scoped>

</style>
