<template>
  <div class="page">
    <router-view v-slot="{ Component }">
      <transition name="fade"
                  mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <HomeFooter />
  </div>
</template>

<script>
import HomeFooter from '@/views/home/components/footer/HomeFooter'
export default {
  components: {
    HomeFooter
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
}
</style>
