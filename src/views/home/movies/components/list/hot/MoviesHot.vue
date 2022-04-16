<template>
  <div class="hot">
    <div class="loading-container"
         v-show="flag">
      <loading></loading>
    </div>
    <scroll :pullUpLoad="true"
            @pullingUp="pullingUp"
            ref="scrollRef">
      <div>
        <ListRated :data="hotListRated"
                   title="最受好评电影" />
        <ListMovies :data="hotListMovies"
                    :loading="loading"
                    ref="listmovie" />
      </div>
    </scroll>
  </div>
</template>

<script>
import ListRated from '../components/ListRated.vue'
import ListMovies from '../components/ListMovies.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import Loading from '@/components/base/loading/loading.vue'
import loadMore from './loadMore'

export default {
  setup () {
    const {
      flag,
      hotListRated,
      hotListMovies,
      loading,
      pullingUp,
      scrollRef
    } = loadMore()

    return {
      flag,
      hotListRated,
      hotListMovies,
      loading,
      pullingUp,
      scrollRef
    }
  },
  components: {
    ListRated,
    ListMovies,
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
.hot {
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
