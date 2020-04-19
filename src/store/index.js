import Vuex from 'vuex';
import Vue from 'vue';
import shop from '@/api/shop'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //Similar to data
        products: [],
        cart: [],

        checkoutStatus: null
    },
    getters: {
        // Similar to properties, perfect for when we need to calculate or filter something upon runtime

        //Vuex automatically passes the state as the first parameter, and all existing getters as the second parameter


        availableProducts(state, getters){
            return state.products.filter(product => product.inventory > 0)
        },


        cartProducts(state){
            return state.cart.map((cartItem) => {
                const product = state.products.find(product => product.id === cartItem.id);

                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal(state, getters) {
            let total = 0;

            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity;
            });

            return total;
        },

        productIsInStock(state, getters, product){
            return (product) => {
                return product.inventory > 0;
            }
        }
    },
    actions: {
        //Similar to methods, perform api call
        /*
            Actions decide when a mutation should fire
            and mutations are always the ones to change the state
         */
        //We can also use ES6 destructuring to grab only the {commit} method from the context object
        fetchProducts({commit}){

            //Wrap in promise because actions are usually async
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProducts', products);
                    resolve();
                })
            });

        },

        addProductToCart(context, product){

            if(product.inventory > 0) {

                const cartItem = context.state.cart.find(item => item.id === product.id);

                if(!cartItem) {
                    context.commit('pushProductToCart', product.id)
                } else {
                    context.commit('incrementItemQuantity', cartItem)
                }

                context.commit('decrementProductInventory', product)
            }

        },


        checkout: function () {
            shop.buyProducts(context.state.cart,
                () => {
                    context.commit('emptyCart');
                    context.commit('setCheckoutStatus', 'success')
                },

                () => {
                    context.commit('setCheckoutStatus', 'fail')
                })
        }
        // addToCart(context, product) {
        //     if(product.inventory > 0) {
        //         context.commit('', product)
        //     } else {
        //
        //     }
        // }
    },
    mutations: {
    //    Responsible for setting and updating state
        setProducts(state, products){
            state.products = products;
        },

        pushProductToCart (state, productId){
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++;
        },

        decrementProductInventory(state, product) {
            product.inventory--;
        },

        setCheckoutStatus(state, checkoutStatus){
            state.checkoutStatus = status;
        },

        emptyCart(state){
            state.cart = [];
        }
    }

});