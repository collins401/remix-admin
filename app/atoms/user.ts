import { atom } from 'jotai';

import request from '~/lib/ofetch';

// 用户接口返回的数据
export const userInfoAtom = atom(async () => {
	const cache = localStorage.getItem('userInfo');
	if (cache) {
		return JSON.parse(cache);
	}
	const res = await request('/getInfo');
	localStorage.setItem('userInfo', JSON.stringify(res));
	return res;
});

// 菜单权限接口
export const authMenuAtom = atom(async () => {
	const res = await request('/getRouters');
	res.data.splice(
		3,
		0,
		{
			path: '/list',
			meta: { title: '表单列表', icon: 'element' },
			hidden: false,
			name: 'List',
		},
		{
			path: '/check',
			meta: { title: '权限验证', icon: 'check' },
			hidden: false,
			name: 'Check',
		},
	);
	return res?.data || [];
});
