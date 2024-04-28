import { Modal, notification } from 'antd';
import { ofetch } from 'ofetch';
import { LOGIN_PAGE, LOGIN_TOKEN_KEY } from './config';

export const errorMessage: any = {
	'401': '认证失败，无法访问系统资源',
	'403': '当前操作没有权限',
	'404': '访问资源不存在',
	default: '系统未知错误，请反馈给管理员',
};

const token =
	typeof localStorage !== 'undefined'
		? localStorage.getItem(LOGIN_TOKEN_KEY)
		: '';
const userCenter = ['/getInfo', '/getRouters'];
const request = ofetch.create({
	retry: 0,
	baseURL: '/prod-api',
	timeout: 20000,
	headers: {
		Authorization: `Bearer ${token}`,
	},
	credentials: 'include',
	onRequest: () => {},
	onResponse: ({ response }) => {
		if (response.status === 200) {
			if (response._data.code === 401) {
				if (userCenter.some((s) => response.url.includes(s))) {
					location.href = LOGIN_PAGE;
				} else {
					Modal.destroyAll();
					Modal.confirm({
						title: '提示信息',
						content: '登录状态已过期，请重新登录',
						okButtonProps: { className: '!bg-primary' },
						okText: '去登录',
						cancelText: '取消',
						onOk: () => {
							localStorage.clear();
							sessionStorage.clear();
							window.location.href = LOGIN_PAGE;
						},
					});
				}
			}
			return response._data;
		}
		const { status, statusText } = response;
		const errorText = errorMessage[status] || statusText;
		notification.destroy();
		notification.error({
			message: '请求错误',
			description: errorText,
		});
	},
	onResponseError({ response }) {
		// Log error
		if (response?.status) {
			const { status, statusText } = response;
			const errorText = errorMessage[status] || statusText;
			notification.destroy();
			notification.error({
				message: '请求错误',
				description: errorText,
			});
		}
		return response?._data;
	},
});
export default request;
