import { atom } from 'jotai';
import request from '~/lib/request';

// 用户接口返回的数据
export const userInfoAtom = atom(async () => {
  const res = await request('/getInfo');
  console.log(res);
  return res;
});

// 菜单权限接口
export const authMenuAtom = atom(async () => {
  const res = await request('/getRouters');
  return res?.data || [];
});
