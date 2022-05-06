import { createRouter, createWebHashHistory } from 'vue-router'

const HomeIndex = () => import('../views/home/HomeIndex.vue')
const Detail = () => import('../views/detail/Detail.vue')
const City = () => import('../views/city/City.vue')
const NotFound = () => import('../views/404/NotFound.vue')
const Movies = () => import('../views/home/movies/Movies.vue')
const Video = () => import('../views/home/video/Video.vue')
const MiniVideo = () => import('../views/home/mini-video/MiniVideo.vue')
const Show = () => import('../views/home/show/Show.vue')
const Mine = () => import('../views/home/mine/Mine.vue')
const Hot = () => import('../views/home/movies/components/list/hot/MoviesHot.vue')
const Cinema = () => import('../views/home/movies/components/list/cinema/MoviesCinema.vue')
const Wait = () => import('../views/home/movies/components/list/wait/MoviesWait.vue')
const Classic = () => import('../views/home/movies/components/list/classic/MoviesClassic.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/detail/:id',
    component: Detail,
    props: true,
    meta: {
      requireAlive: false
    }
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/home',
    component: HomeIndex,
    children: [
      {
        path: '/home',
        redirect: '/home/movies'
      },
      {
        path: 'movies',
        component: Movies,
        children: [
          {
            path: '/home/movies',
            redirect: '/home/movies/hot'
          },
          {
            path: 'hot',
            component: Hot,
            name: 'hot'
          },
          {
            path: 'cinema',
            component: Cinema,
            name: 'cinema'
          },
          {
            path: 'wait',
            component: Wait,
            name: 'wait'
          },
          {
            path: 'classic',
            component: Classic,
            name: 'classic'
          }
        ]
      },
      {
        path: 'video',
        component: Video
      },
      {
        path: 'mini-video',
        component: MiniVideo
      },
      {
        path: 'show',
        component: Show
      },
      {
        path: 'mine',
        component: Mine
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
