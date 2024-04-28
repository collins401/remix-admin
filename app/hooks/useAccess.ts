import { useAtomValue } from 'jotai';
import { userInfoAtom } from '~/atoms/user';

const ADMIN_PERMISSION = '*:*:*';
const ADMIN_ROLE = 'admin';

export default function useAccess() {
	const userInfo = useAtomValue(userInfoAtom);

	function hasPermission(access?: string | string[]) {
		const accessList = userInfo.permissions;
		if (!access) {
			return accessList?.[0] === ADMIN_PERMISSION;
		}
		if (accessList?.[0] === ADMIN_PERMISSION) return true;
		if (Array.isArray(access)) {
			return accessList.some((item) => access.includes(item));
		}
		return accessList.includes(access);
	}

	function hasRole(role?: string | string[]) {
		const roleList = userInfo.roles;
		if (!role) {
			return roleList?.[0] === ADMIN_ROLE;
		}
		if (roleList?.[0] === ADMIN_ROLE) return true;
		if (Array.isArray(role)) {
			return roleList.some((item) => role.includes(item));
		}
		return roleList.includes(role);
	}

	return {
		hasPermission,
		hasRole,
		userInfo: userInfo?.user,
	};
}
