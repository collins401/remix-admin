import { Form, redirect, useNavigate } from '@remix-run/react';
import { Modal } from 'antd';

export function cliendLoader() {
	// your code
	return redirect('/list/model');
}

export default function MemberDisableRoute() {
	const navigate = useNavigate();
	return (
		<Modal open={true} onCancel={() => navigate('/list')}>
			<div className="modal-box">
				<h3 className="font-bold text-lg">Are you sure?</h3>
				<div className="modal-action">
					<Form method="POST">
						<input name="id" value="id" />
						<button className="btn" type="button">
							Yes
						</button>
					</Form>
				</div>
			</div>
		</Modal>
	);
}
