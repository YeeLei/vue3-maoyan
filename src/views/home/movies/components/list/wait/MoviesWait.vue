<template>
  <div class="wait">
    <div class="loading-container"
         v-show="flag">
      <loading></loading>
    </div>
    <scroll ref="scrollRef"
            :pullUpLoad="true"
            @pullingUp="pullingUp">
      <div>
        <list-rated :data="waitListRated"
                    title="近期最受期待" />
        <list-movies :data="waitListMovies"
                     :loading="loading"
                     ref="listmovie" />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll.vue'
import ListRated from '../components/ListRated.vue'
import ListMovies from '../components/ListMovies.vue'
import Loading from '@/components/base/loading/loading.vue'
import loadMore from './loadMore'

export default {
  setup () {
    const {
      flag,
      waitListRated,
      waitListMovies,
      loading,
      pullingUp,
      scrollRef
    } = loadMore()

    return {
      flag,
      waitListRated,
      waitListMovies,
      loading,
      pullingUp,
      scrollRef
    }
  },
  components: {
    Scroll,
    ListRated,
    ListMovies,
    Loading
  }
}

</script>
<style lang='scss' scoped>
.wait {
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
