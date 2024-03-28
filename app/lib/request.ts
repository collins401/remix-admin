import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { notification } from 'antd';
import { LOGIN_TOKEN_KEY, LOGIN_PAGE } from '~/lib/config';

export const errorMessage: any = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  default: '系统未知错误，请反馈给管理员'
};

const service = axios.create({
  baseURL: '/prod-api',
  timeout: 12000
});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // config
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem(LOGIN_TOKEN_KEY)}`
    };
    return config;
  },
  (error: AxiosError) => Promise.resolve(error || '服务器异常')
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorMessage[code] || res.data.msg || errorMessage.default;
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    if (code === 401) {
      location.href = LOGIN_PAGE
    }
    // if (code === 500) {
    //   message.warning(msg);
    //   return Promise.reject(new Error(msg));
    // }
    // if (code === 601) {
    //   message.warning(msg);
    //   return Promise.reject(new Error(msg));
    // }
    if (code !== 200) {
      // location.href = '/login';
      notification.destroy();
      notification.error({
        message: '请求错误',
        description: msg
      });
      // return Promise.reject(msg);
    }
    return res.data as any
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response?.status) {
      const { status, statusText } = response;
      const errorText = errorMessage[status] || statusText;
      notification.destroy();
      notification.error({
        message: '请求错误',
        description: errorText
      });
    }
    return Promise.reject(error);
  }
);

export default service;
