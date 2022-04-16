import { getHotRatedApi, getHotMoviesApi, getHotMoreMoviesApi } from '@/service/api'
import { ref, onMounted } from 'vue'

export default function loadMore () {
  const flag = ref(false)
  const loading = ref(true)
  const hotListRated = ref([])
  const hotListMovies = ref([])
  const size = ref(6) // 每次下拉更新的数量
  const ids = ref([]) // 所有电影的id的数组
  const pullIds = ref([])
  const startIndex = ref(0) // 从第几项开始截取
  const scrollRef = ref(null)

  onMounted(() => {
    flag.value = true
    setTimeout(async () => {
      const res1 = await getHotRatedApi()
      const res2 = await getHotMoviesApi()
      hotListRated.value = res1.result
      hotListMovies.value = res2.result
      ids.value = res2.ids
      startIndex.value = res2.result.length
      flag.value = false
    }, 1000)
  })
  // 下拉加载更多
  const pullingUp = async () => {
    if (hotListMovies.value.length === ids.value.length) {
      loading.value = false
      // console.log('没有数据了')
      return
    }
    loading.value = true
    setTimeout(async () => { // 延迟加载1秒，提高用户体验
      pullIds.value = ids.value.slice(startIndex.value, startIndex.value + size.value)
      const res = await getHotMoreMoviesApi({ ids: pullIds.value.join(',') })
      // 更新数据
      hotListMovies.value = [...hotListMovies.value, ...res.result]
      startIndex.value = hotListMovies.value.length
      refresh()
      // 开启下一次下拉加载事件
      scrollRef.value.scroll.finishPullUp()
    }, 1000)
  }
  const refresh = () => {
    scrollRef.value.scroll.refresh()
  }

  return {
    flag,
    hotListRated,
    hotListMovies,
    loading,
    pullingUp,
    scrollRef
  }
}
