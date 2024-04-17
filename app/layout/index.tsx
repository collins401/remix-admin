import { Outlet } from '@remix-run/react'
import { Suspense, useState } from 'react'
import { useMount } from 'ahooks'
import { Alert, Layout, theme } from 'antd'
import HeaderBar from './components/HeaderBar'
import SiderBar from './components/SiderBar'

import { ErrorBoundary, Loading } from '~/components'
import { getAuthorization } from '~/lib/utils'

export default function BasicLayout() {
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  useMount(() => {
    getAuthorization()
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        location.href = '/login'
      })
  })

  if (loading) return <Loading />

  return (
    <Layout className="!min-h-[100vh]">
      <SiderBar collapsed={collapsed} onChange={setCollapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} onChange={setCollapsed} />
        <Layout.Content className="m-4">
          <div className="container mx-auto">
            <Suspense fallback={<Loading />}>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </Suspense>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
