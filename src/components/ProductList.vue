<template>
    <div>
        <h1>Product List</h1>

        <img v-if="loading">
        <ul v-else>
            <li v-for="product in products">{{product.title}} - {{product.price}} - {{product.inventory}}
                <button :disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import shop from '@/api/shop';

    import {mapState} from 'vuex'

//    No need to import store because it was imported in main.js so available globally
    export default {

        data() {
            return {
                loading: false
            }
        },
        computed: {
            products(){
                return this.$store.state.products;

//                return this.$store.getters.availableProducts;
            },

            productIsInStock(product){
                return this.$store.getters.productIsInStock
            }

        },

        methods: {
            addProductToCart(product) {
                this.$store.dispatch('addProductToCart', product)
            }
        },

        created(){
            this.loading = true;

            //Move get products into index
//            shop.getProducts(products => {
//                store.commit('setProducts', products);
//            })

            this.$store.dispatch('fetchProducts')
                .then(() => this.loading = false)
        }
    }
</script>