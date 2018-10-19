import axios from 'axios'
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

const baseUrl = 'http://118.24.150.65:8083/api'
//const baseUrl = 'http://localhost:4000/api'
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + url, {params}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    console.log(params)
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + url, params).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  fetchPut (url, params = {}) {
    console.log(params)
    return new Promise((resolve, reject) => {
      axios.put(baseUrl + url, params).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  fetchDel (url, params = {}) {
    console.log(params)
    return new Promise((resolve, reject) => {
      axios.delete(baseUrl + url, params).then(res => {
        console.log(res)
        resolve(res.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}
