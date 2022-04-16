<template>
  <div class="classic">
    <div class="loading-container"
         v-show="flag">
      <loading></loading>
    </div>
    <scroll ref="scrollRef">
      <div>
        <list-movies :data="listMovies"
                     ref="listmovie" />
      </div>
    </scroll>
  </div>
</template>

<script>
import { getClassicMoviesApi } from '@/service/api'
import Scroll from '@/components/base/scroll/scroll.vue'
import ListMovies from '../components/ListMovies.vue'
import Loading from '@/components/base/loading/loading.vue'
import { ref, onMounted } from '@vue/runtime-core'

export default {
  setup () {
    const flag = ref(true)
    const listMovies = ref([])

    onMounted(() => {
      flag.value = true
      setTimeout(async () => {
        const res = await getClassicMoviesApi()
        listMovies.value = res.classicMovies.list
        flag.value = false
      }, 1000)
    })
    return {
      flag,
      listMovies
    }
  },
  components: {
    Scroll,
    ListMovies,
    Loading
  }
}

</script>
<style lang='scss' scoped>
.classic {
  width: 100%;
  position: fixed;
  left: 0;
  top: 154px;
  bottom: 50px;
  overflow: hidden;
  .loading-container {
    margin-top: 10px;
  }
}
</style>
