import { Modal, notification } from 'antd'
import { ofetch } from 'ofetch'
import { LOGIN_TOKEN_KEY } from './config'

export const errorMessage: any = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  default: '系统未知错误，请反馈给管理员'
};

const token = typeof localStorage !== 'undefined' ? localStorage.getItem(LOGIN_TOKEN_KEY) : '';

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
          title: '提示信息',
          content: '登录过期，请重新登录',
          okButtonProps: { className: '!bg-primary'},
          onOk: () => {
            localStorage.removeItem(LOGIN_TOKEN_KEY)
            window.location.href = '/login'
          }
        })
      }
      return response._data
    } else {
      const { status, statusText } = response;
      const errorText = errorMessage[status] || statusText;
      notification.destroy();
      notification.error({
        message: '请求错误',
        description: errorText
      });
    }
  },
  async onResponseError({ request, response }) {
    // Log error
    console.log('onResponseError', response)
    if (response?.status) {
      const { status, statusText } = response;
      const errorText = errorMessage[status] || statusText;
      notification.destroy();
      notification.error({
        message: '请求错误',
        description: errorText
      });
    }
    return response?._data
  },
})
export default request
