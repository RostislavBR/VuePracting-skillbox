import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    statusLoading: false,
    orderInfo: null,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      // eslint-disable-next-line no-shadow
      const item = state.cartProducts.find((item) => item.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    incrementCartProduct(state, productId) {
      state.cartProducts.find((item) => {
        if (item.productId === productId) {
          // eslint-disable-next-line no-param-reassign
          item.amount += 1;
        }
        return item;
      });
    },
    decrementCartProduct(state, productId) {
      state.cartProducts.find((item) => {
        if (item.productId === productId) {
          // eslint-disable-next-line no-param-reassign
          item.amount -= 1;
        }
        return item;
      });
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductData(state, items) {
      console.log('update cart products data');
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    setStatusLoading(state, status) {
      state.statusLoading = status;
      console.log(status);
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item.product.price * item.amount + acc, 0);
    },
    cartTotalProducts(state) {
      return state.cartProducts.length;
    },
    getStatusLoading(state) {
      return state.statusLoading;
    },
    getOrderProducts(state) {
      return state.orderInfo ? state.orderInfo.basket.items : null;
    },
    getOrderInfo(state) {
      return state.orderInfo;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolave) => setTimeout(resolave, 2000)))
        .then(() => axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartProductData', response.data.items);
            context.commit('syncCartProducts');
          }));
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },

    deleteCartProducts(context, productId) {
      context.commit('setStatusLoading', true);
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          data: {
            productId,
          },
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductData', response.data.items);
          setTimeout(() => context.commit('setStatusLoading', false), 2000);
          context.commit('syncCartProducts');
        });
    },
  },
});


