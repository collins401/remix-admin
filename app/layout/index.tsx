import { Link, Outlet } from '@remix-run/react'
import { Suspense, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { useMount } from 'ahooks'
import { Button, Layout, Menu, theme } from 'antd'
import HeaderBar from './components/HeaderBar'

import { ErrorBoundary, Loading } from '~/components'
import { SITE_TITLE } from '~/lib/config'
import { getAuthorization } from '~/lib/utils'

const { Header, Sider, Content } = Layout

export default function BasicLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)
  const {
    token: { colorBgContainer, borderRadiusLG }
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
      <Sider trigger={null} collapsible collapsed={collapsed} width={230}>
        <div className="flex items-center pl-5">
          <Link to="/">
            <img src="/logo.png" alt="" className="h-[40px]" />
          </Link>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1'
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2'
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3'
            }
          ]}
        />
      </Sider>
      <Layout>
        <HeaderBar />
        {/* <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header> */}
        <Content className="m-4">
          <div className="container mx-auto">
            <Suspense fallback={<Loading />}>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
