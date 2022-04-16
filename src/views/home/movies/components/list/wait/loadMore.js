import { getWaitRatedApi, getWaitMoviesApi, getWaitMoreMoviesApi } from '@/service/api'
import { ref, onMounted } from 'vue'

export default function loadMore () {
  const flag = ref(false)
  const loading = ref(true)
  const waitListRated = ref([])
  const waitListMovies = ref([])
  const size = ref(6) // 每次下拉更新的数量
  const movieIds = ref([]) // 所有电影的id的数组
  const pullIds = ref([])
  const startIndex = ref(0) // 从第几项开始截取
  const scrollRef = ref(null)

  onMounted(() => {
    flag.value = true
    setTimeout(async () => {
      const res1 = await getWaitRatedApi()
      const res2 = await getWaitMoviesApi()
      waitListRated.value = res1.result
      waitListMovies.value = res2.coming
      movieIds.value = res2.movieIds
      startIndex.value = res2.coming.length
      flag.value = false
    }, 1000)
  })

  // 下拉加载更多
  const pullingUp = async () => {
    if (waitListMovies.value.length === movieIds.value.length) {
      loading.value = false
      // console.log('没有数据了')
      return
    }
    loading.value = true
    setTimeout(async () => { // 延迟加载1秒，提高用户体验
      pullIds.value = movieIds.value.slice(startIndex.value, startIndex.value + size.value)
      const res = await getWaitMoreMoviesApi({ ids: pullIds.value.join(',') })
      // 更新数据
      waitListMovies.value = [...waitListMovies.value, ...res.result]
      startIndex.value = waitListMovies.value.length
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
    waitListRated,
    waitListMovies,
    loading,
    pullingUp,
    scrollRef
  }
}
