<template>
  <nav>
    <div class="city"
         @click="selectCity"><span>{{cityName}}</span><i class="citt-arrow"></i></div>
    <ul ref="ulRef">
      <router-link v-for="(item) in list"
                   :key="item.title"
                   :to="item.path"
                   custom
                   v-slot="{navigate, isExactActive}">
        <li @click="navigate"
            :class="{exactActive: isExactActive}"
            ref="liRef">
          <a @click="handleNavClick">{{ item.title }}</a>
        </li>
      </router-link>
    </ul>
    <span class="line"
          ref="lineRef">
    </span>
    <span class="iconfont icon-fangdajing"></span>
  </nav>
</template>

<script>
import { computed, ref, onMounted } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'm-nav',
  setup () {
    // data
    const OFFSETWIDTH = 62
    const currentIndex = ref(0)
    const list = ref([
      {
        title: '热映',
        path: 'hot'
      },
      {
        title: '影院',
        path: 'cinema'
      },
      {
        title: '待映',
        path: 'wait'
      },
      {
        title: '经典电影',
        path: 'classic'
      }
    ])
    const ulRef = ref(null)
    const lineRef = ref(null)

    // vuex
    const store = useStore()
    const cityName = computed(() => store.state.city.localCity.name)

    // router
    const route = useRoute()
    const router = useRouter()

    // mounted
    onMounted(() => {
      list.value.forEach((item, index) => {
        if (route.name === item.path) {
          currentIndex.value = index
        }
      })
      const el = ulRef.value.children[currentIndex.value]
      lineRef.value.style.left = OFFSETWIDTH + el.offsetLeft + (el.offsetWidth / 2) + 'px'
    })

    // methods
    const handleNavClick = (el) => {
      lineRef.value.style.left = OFFSETWIDTH + el.srcElement.offsetLeft + (el.srcElement.offsetWidth / 2) + 'px'
    }
    const selectCity = () => {
      router.push({
        path: '/city'
      })
    }
    return {
      ulRef,
      lineRef,
      list,
      cityName,
      handleNavClick,
      selectCity
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
nav {
  top: 110px;
  width: 100%;
  height: 44px;
  background: $white-color;
  @include border-bottom-1px($border-color);
  position: fixed;
  display: flex;
  font-size: $s-font;

  .city {
    width: 62px;
    margin-left: 10px;
    text-align: center;
    line-height: 44px;
    @include no-wrap();
    .citt-arrow {
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-top-color: #b0b0b0;
      display: inline-block;
      margin: 5px 5px 0 4px;
    }
  }

  .iconfont {
    width: 45px;
    @include center();
    color: $theme-color;
    font-size: $xxl-font;
    font-weight: bold;
  }

  ul {
    position: relative;
    flex: 1;
    align-self: center;
    padding-left: 20px;
    li {
      float: left;
      width: 50px;
      a {
        display: block;
        line-height: 40px;
        height: 100%;
        text-align: center;
        font-weight: 700;
        color: $gray-color;
      }
    }
    li:last-child {
      width: 80px;
    }
    .exactActive a {
      font-size: $m-font;
      color: #333;
      position: relative;
    }
  }
  .line {
    position: absolute;
    width: 20px;
    height: 3px;
    background: $theme-color;
    bottom: 5px;
    border-radius: 1.5px;
    transition: all 0.2s;
  }
}
</style>
