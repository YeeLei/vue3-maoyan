import { getMovieDetailApi } from '@/service/api'
const detailModule = {
  state: {
    detailInfo: {} // 电影详情数据
  },
  mutations: {
    changeDetailInfo (state, payload) {
      state.detailInfo = payload.result
    },
    clearDetailInfo (state) {
      state.detailInfo = {}
    }
  },
  actions: {
    getDetailInfoAsync ({ commit }, payload) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const res = await getMovieDetailApi({ id: payload })
        commit('changeDetailInfo', res)
        resolve(res)
      })
    }
  }
}
export default detailModule
