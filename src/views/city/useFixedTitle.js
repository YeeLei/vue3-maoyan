import { ref, computed, watch } from '@vue/runtime-core'
export default function useFixedTitle (scrollY, listHeight, shortcutList) {
  const TITLE_HEIGHT = 30
  const currentIndex = ref(0)
  const diff = ref(-1)
  const fixedRef = ref(null)

  const fixedTitle = computed(() => {
    if (scrollY.value > 0) {
      return ''
    }
    return shortcutList.value[currentIndex.value]
      ? shortcutList.value[currentIndex.value].toUpperCase()
      : ''
  })
  // console.log(fixedTitle)
  // watch
  watch(scrollY, newY => {
    // eslint-disable-next-line no-use-before-define
    const listHeightsVal = listHeight.value
    // 当滚动到顶部，newY>0
    if (newY > 0) {
      currentIndex.value = 0
      return
    }
    // 在中间部分滚动,因为获取到的listHight多加了一层为0的列表,所以中间层为 listHeight.length - 1
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const height1 = listHeightsVal[i]
      const height2 = listHeightsVal[i + 1]
      if (-newY >= height1 && -newY < height2) {
        currentIndex.value = i
        diff.value = height2 + newY
        return
      }
    }
    // 当滚动到底部，且-newY大于最后一个元素的上限
    currentIndex.value = listHeightsVal.length - 2
  })
  watch(diff, newVal => {
    const fixedTop =
      newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
    fixedRef.value.style.transform = `translate3d(0,${fixedTop}px,0)`
  })
  return {
    currentIndex,
    fixedRef,
    fixedTitle
  }
}
