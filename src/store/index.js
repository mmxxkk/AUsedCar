
import { createStore } from 'vuex'

export default createStore({
  state: {
    address: localStorage.address ? JSON.parse(localStorage.address) : {
      cityId: '#',
      name: "全国"
    },

    brand: localStorage.brand ? JSON.parse(localStorage.brand) : { id: '' },
    serie: localStorage.serie ? JSON.parse(localStorage.serie) : { id: '' },
    model: localStorage.model ? JSON.parse(localStorage.model) : { id: '' },
    price: localStorage.price ? JSON.parse(localStorage.price) : { sortValue: '' },

    screen: localStorage.screen ? JSON.parse(localStorage.screen) : [],
    initscreen: []


  },
  getters: {
  },
  mutations: {
    setAddress(state, obj) {
      localStorage.setItem('address', JSON.stringify(obj))
      state.address = obj;
    },

    setBrand(state, obj) {
      localStorage.setItem('brand', JSON.stringify(obj))
      state.brand = obj;
    },
    setSerie(state, obj) {
      localStorage.setItem('serie', JSON.stringify(obj))
      state.serie = obj;
    },
    setModel(state, obj) {
      localStorage.setItem('model', JSON.stringify(obj))
      state.model = obj;
    },
    setPrice(state, obj) {
      localStorage.setItem('price', JSON.stringify(obj))
      state.price = obj;
    },

    initscreenlist(state, arr) {
      state.initscreen = arr;
      if (!localStorage.screen) {
        state.screen = arr
        localStorage.setItem('screen', JSON.stringify(arr))
      }
    },
    setScreen(state, obj) {
      if (!obj) {
        state.screen = state.initscreen
        localStorage.setItem('screen', JSON.stringify(state.screen))
      } else {
        if (obj.item) {
          state.screen[obj.index] = obj.item
        } else {
          state.screen[obj.index] = state.initscreen[obj.index]
        }
        localStorage.setItem('screen', JSON.stringify(state.screen))
      }
    },
  },

  actions: {
  },
  modules: {
  }
})
