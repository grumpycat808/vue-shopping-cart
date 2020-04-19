<template>
    <div>
        <h1>Shopping Cart</h1>

        <ul>
            <li v-for="product in products">

            </li>
        </ul>

        <p>Total: {{total}}</p>

        <button @click="$store.dispatch('checkout')">Checkout</button>

        <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
    </div>
</template>

<script>
    export default {

        computed: {
            products(){
                return this.$store.getters.cartProducts
            },
            total(){
                return this.$store.getters.cartTotal
            }
        }
    }
</script>