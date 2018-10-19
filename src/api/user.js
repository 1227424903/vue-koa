import http from './public'

// 登陆
export const userLogin = (params) => {
  return http.fetchPost(`/user/login`, params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchPost(`/user/loginout`, params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost(`/user/register`, params)
}
