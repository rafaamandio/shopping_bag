import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    
    loadBag(state, products) {
      state.productsInBag = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsIBag', JSON.stringify(state.productsInBag))
    },

    removeFromBag(state, productId) {
      const updatedBag = state.productsInBag.filter(item => item.id !== productId);
      state.productsInBag = updatedBag;
      localStorage.setItem('productsIBag', JSON.stringify(state.productsInBag))
    },
  },
  actions: {

    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts', response.data);
      })
    },

    loadBag({ commit }) {
      if (localStorage.getItem('productsIBag')) {
        commit('loadBag', JSON.parse(localStorage.getItem('productsIBag')));
      }
    },

    addToBag({commit}, product) {
      commit('addToBag', product);
    },

    removeFromBag({commit}, productId) {
      if(confirm('Tem certeza que deseja remover este produto do carrinho?')) {
        commit('removeFromBag', productId);
      }
    },

  },
})


