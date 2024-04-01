import { atom } from 'jotai';

import request from '~/lib/ofetch';

// 用户接口返回的数据
export const userInfoAtom = atom(async () => {
  const res = await request('/getInfo');
  return res;
});

// 菜单权限接口
export const authMenuAtom = atom(async () => {
  const res = await request('/getRouters');
  return res?.data || [];
});
