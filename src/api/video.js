import http from './public'

export const getVideo = (params) => {
  return http.fetchGet(`/video/get`, params)
}

export const addVideo = (params) => {
  return http.fetchPost(`/video/add`, params)
}

export const delVideo = (params) => {
  return http.fetchDel(`/video/del`, params)
}

export const updateVideo = (params) => {
  return http.fetchPut(`/video/update`, params)
}
