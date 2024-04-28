import { Outlet } from '@remix-run/react';
import { useMount } from 'ahooks';
import { Layout } from 'antd';
import { Suspense, useState } from 'react';
import HeaderBar from './components/HeaderBar';
import SiderBar from './components/SiderBar';

import { ErrorBoundary, Loading } from '~/components';
import { getAuthorization } from '~/lib/utils';

export default function BasicLayout() {
	const [loading, setLoading] = useState(true);
	const [collapsed, setCollapsed] = useState(false);
	useMount(() => {
		getAuthorization()
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				location.href = '/login';
			});
	});

	if (loading) return <Loading />;

	return (
		<Layout className="!min-h-[100vh]">
			<SiderBar collapsed={collapsed} onChange={setCollapsed} />
			<Layout>
				<HeaderBar />
				<Layout.Content className="m-4">
					<Suspense fallback={<Loading />}>
						<ErrorBoundary>
							<Outlet />
						</ErrorBoundary>
					</Suspense>
				</Layout.Content>
			</Layout>
		</Layout>
	);
}
