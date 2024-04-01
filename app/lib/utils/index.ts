import { message } from 'antd';
import { isEmpty } from 'lodash-es';
import service, { errorMessage } from '../request';

import { LOGIN_TOKEN_KEY } from '~/lib/config';

export function getAuthorization() {
  const searchParams = new URLSearchParams(location.search);
  const url_token = searchParams.get('access_token');
  const access_token = localStorage.getItem(LOGIN_TOKEN_KEY);
  if (url_token) {
    localStorage.setItem(LOGIN_TOKEN_KEY, url_token);
    sessionStorage.clear();
    location.href = '/';
    return Promise.resolve(true);
  } else if (access_token) {
    return Promise.resolve(true);
  }
  return Promise.reject(new Error('缺少token'));
}
/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = encodeURIComponent(propName) + '=';
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            const params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}

// 验证是否为blob格式
export function blobValidate(data) {
  return data.type !== 'application/json';
}
// 通用下载方法
export function downloadFile(url, params, filename?: string, config?: any) {
  message.loading({
    content: '正在下载数据，请稍候',
    duration: 0
  });
  return service
    .post(url, params, {
      transformRequest: [
        (params) => {
          return tansParams(params);
        }
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config
    })
    .then(async (data) => {
      const isBlob = blobValidate(data);
      if (isBlob) {
        const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        message.destroy();
        message.success('下载成功');
      } else {
        const resText = await data.text?.();
        const rspObj = JSON.parse(resText);
        const errMsg = errorMessage[rspObj.code] || rspObj.msg || errorMessage['default'];
        message.destroy();
        message.error(errMsg);
      }
    })
    .catch(() => {
      message.destroy();
      message.error('下载文件出现错误，请联系管理员！');
    });
}

export function searchRoute(path: string, routes: any) {
  let res: any = null;
  const loop = (data: any, parentPath = '') => {
    for (let i = 0; i < data?.length; i++) {
      const item = data[i];
      const newPath = parentPath ? `${parentPath}/${item.path}` : item.path;
      if (newPath === path) {
        res = item;
        break;
      }
      if (!isEmpty(item.children)) {
        loop(item.children, newPath);
      }
    }
  };
  loop(routes);
  return res;
}
