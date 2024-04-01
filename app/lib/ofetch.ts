import { Modal } from 'antd'
import { ofetch } from 'ofetch'
import { LOGIN_TOKEN_KEY } from './config'

let token: string
if (typeof localStorage !== 'undefined') {
  // running in a browser environment
  token = localStorage.getItem(LOGIN_TOKEN_KEY) || ''
}
const request = ofetch.create({
  retry: 0,
  baseURL: '/prod-api',
  timeout: 20000,
  headers: {
    Authorization: `Bearer ${token}`
  },
  credentials: 'include',
  onRequest: (config: any) => {},
  onResponse: ({ response }) => {
    if (response.status === 200) {
      if (response._data.code === 401) {
        Modal.confirm({
          title: '提示',
          content: '登录过期，请重新登录',
          onOk: () => {
            localStorage.removeItem(LOGIN_TOKEN_KEY)
            window.location.href = '/login'
          }
        })
      }
      return response._data
    } else {
      console.log(response)
      // const errorText = '接口请求出错'
    }
  },
  async onResponseError({ request, response }) {
    // Log error
    console.log(
      "[fetch response error]",
      request,
      response.status,
      response.body
    );
  },
})
export default request
