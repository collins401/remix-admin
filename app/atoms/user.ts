import { atom } from 'jotai';

import request from '~/lib/ofetch';

// 用户接口返回的数据
export const userInfoAtom = atom(async () => {
  const cache = localStorage.getItem('userInfo')
  if (cache) {
    return JSON.parse(cache);
  }
  const res = await request('/getInfo');
  localStorage.setItem('userInfo', JSON.stringify(res));
  return res;
});

// 菜单权限接口
export const authMenuAtom = atom(async () => {
  const cache = localStorage.getItem('routes')
  if (cache) {
    return JSON.parse(cache);
  }
  const res = await request('/getRouters');
  res.data.push({
    path: '/list',
    meta: { title: '表单列表', icon: 'element'},
    hidden: false
  })
  localStorage.setItem('routes', JSON.stringify(res?.data));
  return res?.data || [];
});
