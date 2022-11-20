import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Login from "@/views/Login";
// import PendingPosts from "@/views/PendingPosts";
// import ApprovedPosts from "@/views/ApprovedPosts";
import store from '../store'

Vue.use(VueRouter)

/* Guest Component */
const Login = () => import('../views/Login.vue')
const Register = () => import('../components/Register.vue')
const AccessDenied = () => import('../views/AccessDenied')
const SingleProduct = () => import('../components/SingleProduct')
const SinglePost = () => import('../components/SinglePost')

/* Layouts */
const DahboardAuthLayout = () => import('../components/layout/DashboardAuthLayout.vue')

/* Auth Component */
const Dashboard = () => import('../components/Dashboard.vue')
const PendingPosts = () => import('../components/PendingPostsComp.vue')

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: `HomeView Title`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            title: `Register`
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: `Login`
        }
    },
    {
        path: '/admin',
        component: DahboardAuthLayout,
        children: [
            {
                name: "dashboard",
                path: '/dashboard',
                component: Dashboard,
                meta: {
                    requireAuth: true,
                    title: `Dashboard`
                }
            },
            {
                name: "pending-posts",
                path: '/pending-posts',
                component: PendingPosts,
                meta: {
                    requireAuth: true,
                    isAdmin: true,
                    title: `Pending Posts`
                }
            }
        ]
    },
    {
        path: '/access-denied',
        name: 'access-denied',
        component: AccessDenied,
        meta: {
            title: `Access Denied`
        }
    },
    {
        path:'/product/:id',
        name: 'single-product',
        component: SingleProduct,
        meta: {
            title: 'Product'
        }
    },
    {
        path:'/post/:id',
        name: 'single-post',
        component: SinglePost,
        meta: {
            title: 'Post'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`
    let isAuthenticated = store.state.auth.authenticated
    let user = isAuthenticated ? store.state.auth.user : null
    let isAdmin = typeof to.meta.isAdmin != "undefined" && to.meta.isAdmin ? true : false
    let requireAuth = typeof to.meta.requireAuth != "undefined" && to.meta.requireAuth ? true : false

    let toRouteName = to.name

    // console.log(isAuthenticated);


    if (!requireAuth) {
        next() //guest routes

    } else if (!isAuthenticated){
        next({name: "login"})

    } else if (!isAdmin ){
        next()

    } else {
        //auth routes - admin
        if (user.is_admin){
            next()
        } else {
            next({name: "access-denied"})
        }
    }
})

export default router
