import { Link } from '@remix-run/react'
import React, { useState } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { styled } from 'goober'

interface IProps {
  children?: React.ReactNode
}
const MenuStyle = styled(Menu)`
  .ant-menu-submenu .ant-menu-item.ant-menu-item-selected {
    background: none;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item {
    position: relative;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item:before {
    border-left: 1px solid red;
    height: 100%;
    content: '';
    left: 30px;
    position: absolute;
  }
`
const SiderBar: React.FC = props => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      theme="light"
      width={230}
      onChange={() => setCollapsed(!collapsed)}
    >
      <div className="flex items-center pl-5">
        <Link to="/">{/* <img src="/logo.png" alt="" className="h-[40px]" /> */}</Link>
      </div>
      <MenuStyle
        mode="inline"
        defaultSelectedKeys={['222']}
        openKeys={['2']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1'
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
            children: [
              {
                key: '222',
                icon: <VideoCameraOutlined />,
                label: 'nav 222'
              },
              {
                key: '233',
                icon: <VideoCameraOutlined />,
                label: 'nav 211'
              }
            ]
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3'
          }
        ]}
      />
    </Layout.Sider>
  )
}
export default SiderBar
