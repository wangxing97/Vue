// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    products: [
      { name: '张三', money: 10000 },
      { name: '李四', money: 9000 },
      { name: '王五', money: 6000 },
      { name: '赵六', money: 2000 }
    ]
  },
  getters: {
    salesProduct: state => {
      var list = state.products.map(item => {
        return {
          name: '**' + item.name + '**',
          money: item.money / 2
        }
      })
      return list
    }
  },
  mutations: {
    reduceProduct: (state, price) => {
      state.products.forEach(product => {
        product.money -= price
      })
    }
  },
  actions: {
    reduceProductByAction: (context, price) => {
      return context.commit('reduceProduct', price)
    }
  }
})
