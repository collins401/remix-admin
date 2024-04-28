import { divide } from 'lodash-es';
import useAccess from '~/hooks/useAccess';
export default function Check() {
	const { hasRole } = useAccess();
	return (
		<div className="bg-white p-5 rounded">
			<div className="text-danger">以下内容仅admin角色所见</div>
			{hasRole() && (
				<div className="bg-gray-200 rounded p-4 mt-2"> 您当前角色为admin </div>
			)}
		</div>
	);
}
