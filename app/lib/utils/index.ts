import { message } from 'antd';
import { isEmpty } from 'lodash-es';
import service from '../ofetch';

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

// 验证是否为blob格式
export function blobValidate(data: Blob) {
  return data.type !== 'application/json';
}
// 通用下载方法
export function downloadFile(url:string, params: any, filename?: string,) {
  message.loading({
    content: '正在下载数据，请稍候',
    duration: 0
  });
  return service(url, {
      method: "POST",
      body: params,
      responseType: 'blob',
    })
    .then((data) => {
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
        message.destroy();
        message.error('下载失败');
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
