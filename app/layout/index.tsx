import NiceModal from '@ebay/nice-modal-react';
import { Outlet, useLocation } from '@remix-run/react';
import { useMount } from 'ahooks';
import { Layout } from 'antd';
import { Suspense, useContext, useEffect, useState } from 'react';
import NiceModalClose from './NiceModalClose'
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
            <NiceModal.Provider>
              <ErrorBoundary>
                <NiceModalClose>
                  <Outlet />
                </NiceModalClose>
              </ErrorBoundary>
            </NiceModal.Provider>
          </Suspense>
				</Layout.Content>
			</Layout>
		</Layout>
	);
}
