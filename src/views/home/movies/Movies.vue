<template>
  <div class="movies">
    <div class="top">
      <HomeHeader title="猫眼电影" />
      <HomeLogo />
    </div>
    <div class="list">
      <movies-nav />
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/views/home/components/header/HomeHeader'
import HomeLogo from '@/views/home/components/logo/HomeLogo'
import MoviesNav from '@/views/home/movies/components/nav/Nav'

export default {
  name: 'm-movie',
  components: {
    HomeHeader,
    HomeLogo,
    MoviesNav
  }
}

</script>
<style lang='scss' scoped>
.movies {
  .top {
    width: 100%;
  }
  .list {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 110px;
    overflow: hidden;
    .homelist {
      width: 100%;
      position: fixed;
      left: 0;
      top: 154px;
      bottom: 50px;
      overflow: hidden;
      .list-wrapper {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
