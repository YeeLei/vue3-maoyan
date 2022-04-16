import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default function useSelectCity (historyCityList) {
  const store = useStore()
  const router = useRouter()
  const selectCity = (item) => {
    store.commit('changeCity', item)
    // 保存到本地
    localStorage.setItem('localCity', JSON.stringify(item))
    // 保存选择城市的历史记录
    let flag = false
    if (historyCityList.value.length !== 0) {
      for (const ele of historyCityList.value) {
        if (ele.name === item.name) {
          flag = true
          break
        }
      }
      if (!flag) {
        const arr = historyCityList.value.concat()
        arr.push(item)
        store.commit('changeHistoryList', arr)
        localStorage.setItem('historyCity', JSON.stringify(arr))
      }
    } else {
      historyCityList.value.push(item)
      localStorage.setItem('historyCity', JSON.stringify(historyCityList.value))
    }
    router.go(-1)
  }
  return {
    selectCity
  }
}
