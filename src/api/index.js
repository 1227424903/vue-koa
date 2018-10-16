import http from './public'
const baseUrl = 'http://118.24.150.65:8083/api'
// const baseUrl = '/api'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost(`${baseUrl}/user/login`, params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchPost(`${baseUrl}/user/loginOut`, params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost(`${baseUrl}/user/register`, params)
}
