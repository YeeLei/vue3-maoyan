import { createStore } from 'vuex'
import cityModule from './city/cityModule'
import detailModule from './detail/detailModule'

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    city: cityModule,
    detail: detailModule
  }
})

export default store
