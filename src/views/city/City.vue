<template>
  <div class="city">
    <div class="city-container">
      <scroll :probeType="3"
              @scroll="scroll"
              ref="scrollRef">
        <div>
          <div class="local-city"
               ref="localCityRef">
            <div class="city-title">
              定位城市
            </div>
            <div class="city-list">
              <div class="location-city city-item"
                   @click="selectCity(localCity)">{{localCity.name}}</div>
            </div>
          </div>
          <div class="history-city"
               ref="historyCityRef">
            <div class="city-title">
              最近访问城市
            </div>
            <div class="city-list">
              <div class="city-item"
                   v-for="item in historyCityList"
                   :key="item.cityId"
                   @click="selectCity(item)">{{item.name}}</div>
            </div>
          </div>
          <div v-for="(item,index) in cityList"
               :key="item.prefix"
               ref="listGroupRef">
            <div class="hot-city"
                 ref="hotCityRef"
                 v-if="index === 0">
              <div class="city-title">
                热门城市
              </div>
              <div class="city-list">
                <div class="city-item"
                     v-for="(city,index) in item.cities"
                     :key="index"
                     @click="selectCity(city)">{{city.name}}</div>
              </div>
            </div>
            <div class="letter-city"
                 ref="letterCityRef"
                 v-else>
              <div class="city-title">
                {{item.prefix.toUpperCase()}}
              </div>
              <ul class="city-letter-list">
                <li class="city-letter-item"
                    v-for="(city,index) in item.cities"
                    :key="index"
                    @click="selectCity(city)">{{city.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="shortcut-list"
         ref="shortcutRef"
         v-if="shortcutList.length > 0">
      <ul>
        <li class="item"
            v-for="(item,index) in shortcutList"
            :key="item.prefix"
            :class="{'current': currentIndex === index}"
            :data-index="index"
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchend.stop.prevent
            v-html="shortcutTitle(item)">
        </li>
      </ul>
    </div>
    <div class="list-fixed"
         ref="fixedRef"
         v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </div>
</template>

<script>
import scroll from '@/components/base/scroll/scroll.vue'
import useFixedShortcut from './useFixedShortcut'
import useFixedTitle from './useFixedTitle'
import useSelectCity from './useSelectCity'
import { watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
  components: { scroll },
  name: 'm-city',

  setup () {
    const {
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
    } = useFixedShortcut()

    const {
      currentIndex,
      fixedRef,
      fixedTitle
    } = useFixedTitle(scrollY, listHeight, shortcutList)

    const { selectCity } = useSelectCity(historyCityList)

    const route = useRoute()
    watch(route, (to) => {
      if (to.path === '/city') {
        scrollRef.value.scroll.scrollTo(0, 0)
      }
    })
    return {
      currentIndex,
      listGroupRef,
      historyCityRef,
      localCityRef,
      scrollRef,
      fixedRef,
      historyCityList,
      cityList,
      shortcutList,
      localCity,
      listHeight,
      shortcutTitle,
      scroll,
      onShortcutTouchStart,
      fixedTitle,
      selectCity
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.city {
  position: fixed;
  background-color: #ebebeb;
  font-size: $s-font;
  color: #333;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  .city-container {
    position: fixed;
    width: 100%;
    height: 100%;
    .city-title,
    .fixed-title {
      padding-left: 15px;
      line-height: 30px;
    }
    .city-list {
      background-color: #f5f5f5;
      padding-bottom: 8px;
      overflow: hidden;
      .location-city {
        width: auto;
        min-width: 30%;
      }
      .city-item {
        width: 28%;
        padding: 0 20px;
        float: left;
        height: 33px;
        margin-top: 15px;
        margin-left: 4%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        @include no-wrap();
      }
    }
    .letter-city {
      .city-letter-list {
        padding: 0 15px;
        background: #f5f5f5;
        .city-letter-item {
          width: 100%;
          height: 44px;
          line-height: 44px;
          border-bottom: 1px solid #c8c7cc;
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
  .shortcut-list {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px 0;
    border-radius: 10px;
    text-align: center;
    z-index: 1000;
    .item {
      width: 40px;
      padding: 3px;
      line-height: 16px;
      text-align: center;
      font-size: $xs-font;
      // &.current {
      //   color: $theme-color;
      // }
      &:nth-of-type(n + 4) {
        width: 20px;
        margin-left: 16px;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ebebeb;
    .fixed-title {
      padding-left: 15px;
      line-height: 30px;
    }
  }
}
</style>
