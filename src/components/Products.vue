<template>
    <div>
        <div class="d-flex align-items-center p-3 my-3 text-white  rounded shadow-sm" style="background-color: #6f42c1">
            <!--      <img class="me-3" src="/docs/5.2/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38">-->
            <div class="lh-1">
                <h1 class="h6 mb-0 text-white lh-1">All Products</h1>
            </div>
        </div>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="border-bottom pb-2 mb-0">Recent updates</h6>

            <div class="list-group w-auto">
                <router-link v-for="product in allProducts" :to="'/product/'+product.id" :key="product.id"
                             class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <img src="https://github.com/twbs.png" alt="twbs" class="rounded-circle flex-shrink-0" width="32"
                         height="32">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h5 class="mb-0">{{ product.product_name }}</h5>
                            <p class="mb-0 opacity-75">{{ product.product_description }}</p>
                        </div>
                        <small class="opacity-50 text-nowrap">{{ product.created_at }}</small>
                    </div>
                </router-link>
                <div class="clearfix">&nbsp;</div>

            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
    name: 'Products',
    computed: {
        ...mapGetters({
            allProducts: 'products/getAllProducts'
        })
    },
    methods: {
        ...mapActions({
            fetchAllProducts: 'products/fetchProducts'
        }),

    },
    mounted() {
        this.fetchAllProducts();
    }
}
</script>

<style scoped>

</style>
