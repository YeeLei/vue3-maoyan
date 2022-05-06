// 统一管理项目的所有接口
import http from './http'

const debug = process.env.NODE_ENV !== 'production'
const BASE_URL = debug
  ? 'http://localhost:8080'
  : 'http://121.5.20.199'

// 最受热映列表接口
export const getHotRatedApi = () => http.get('/rated/list')
// 首页热映电影接口
export const getHotMoviesApi = () => http.get('/movies/list')
// 首页热映下拉加载更多接口
export const getHotMoreMoviesApi = (data) => http.post('/movies/more', data)
// 首页电影详情接口
export const getMovieDetailApi = (data) => http.post('/movies/detail', data)
// 选择地区接口
export const getAreaListApi = () => http.get('/area/list')

// 首页待映最受期待列表接口
export const getWaitRatedApi = () => fetch(BASE_URL + '/api/wait/ratedlist')
  .then(res => res.json()).then(data => {
    if (data.status === 0) {
      return data
    }
  })
// 首页待映电影列表接口
export const getWaitMoviesApi = () => fetch(BASE_URL + '/api/wait/movieslist')
  .then(res => res.json()).then(data => {
    if (data.status === 0) {
      return data
    }
  })
// 首页待映下拉加载更多接口
export const getWaitMoreMoviesApi = (data) => fetch(BASE_URL + '/api/wait/movieslist/more', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
  .then(data => {
    if (data.status === 0) {
      return data
    }
  })
// 首页经典电影列表接口
export const getClassicMoviesApi = () => fetch(BASE_URL + '/api/classic/movieslist')
  .then(res => res.json()).then(data => {
    if (data.status === 0) {
      return data
    }
  })
