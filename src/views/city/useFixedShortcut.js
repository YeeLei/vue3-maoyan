import { ref, onMounted, computed } from '@vue/runtime-core'
import { nextTick } from 'vue'
import { useStore } from 'vuex'

export default function useFixedShortcut () {
  // data
  const listGroupRef = ref(null)
  const localCityRef = ref(null)
  const historyCityRef = ref(null)
  const scrollRef = ref(null)
  const scrollY = ref(0)
  const listHeight = ref([])

  // vuex
  const store = useStore()
  const localCity = computed(() => store.state.city.localCity)
  const cityList = computed(() => store.state.city.cityList)
  const historyCityList = computed(() => store.state.city.historyCityList)

  // mounted
  onMounted(async () => {
    await store.dispatch('getCityListAsync')
    await nextTick()
    calculateHight()
  })

  // computed
  const shortcutList = computed(() => {
    const newarr = ['定位城市', '最近访问城市']
    const arr = cityList.value.map((group, index) => {
      if (index === 0) {
        group.prefix = '热门城市'
      }
      return group.prefix
    })
    return newarr.concat(arr)
  })

  // methods
  const calculateHight = () => {
    // 获取所有的列表层
    const list = listGroupRef.value
    if (list) {
      let height = 0
      // 默认第一层高度为0
      listHeight.value.push(height)
      listHeight.value.push(localCityRef.value.clientHeight)
      listHeight.value.push(historyCityRef.value.clientHeight + localCityRef.value.clientHeight)
      height += historyCityRef.value.clientHeight + localCityRef.value.clientHeight
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        height += item.clientHeight
        listHeight.value.push(height)
      }
    }
  }
  const shortcutTitle = (item) => {
    if (item === '定位城市') {
      return '定位'
    } else if (item === '最近访问城市') {
      return '最近'
    } else if (item === '热门城市') {
      return '热门'
    } else {
      return item.toUpperCase()
    }
  }
  const scroll = (pos) => {
    // 获取Y轴方向上的滚动距离
    scrollY.value = pos.y
  }
  const touch = {}
  const onShortcutTouchStart = (e) => {
    const anchorIndex = e.target.dataset.index
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }
  const scrollTo = (index) => {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    scrollY.value = -listHeight.value[index]
    // 滚动到响应的位置
    if (index === 0) {
      scrollRef.value.scroll.scrollToElement(localCityRef.value, 0)
    } else if (index === 1) {
      scrollRef.value.scroll.scrollToElement(historyCityRef.value, 0)
    } else {
      scrollRef.value.scroll.scrollToElement(listGroupRef.value[index - 2], 0)
    }
  }
  return {
    listGroupRef,
    localCityRef,
    historyCityRef,
    scrollRef,
    shortcutList,
    localCity,
    cityList,
    historyCityList,
    listHeight,
    shortcutTitle,
    scroll,
    onShortcutTouchStart,
    scrollY
  }
}
