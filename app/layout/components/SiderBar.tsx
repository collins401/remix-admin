import { Link, useLocation, useNavigate } from '@remix-run/react'
import React, { useLayoutEffect, useState } from 'react'
import { CodeOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { styled } from 'goober'
import { authMenuAtom } from '~/atoms/user'
import { useAtom } from 'jotai'
import type { MenuProps } from 'antd/es/menu/index'
import { isEmpty } from 'lodash-es'
type MenuItem = Required<MenuProps>['items'][number]

interface IProps {
  children?: React.ReactNode
}
const MenuStyle = styled(Menu)`
  .ant-menu-submenu .ant-menu-item.ant-menu-item-selected {
    background: none;
  }
  &.ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: none;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item {
    position: relative;
    overflow: inherit;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item:before {
    border-left: 1px solid ${props => props.theme.primary};
    height: 100%;
    top: 0px;
    content: '';
    left: 30px;
    position: absolute;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item:after {
    border-top: 1px solid ${props => props.theme.primary};
    width: 14px;
    content: '';
    left: 30px;
    top: 20px;
    opacity: 1;
    transform: scaleY(1);
    position: absolute;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item:last-child {
    &:before {
      height: 50%;
    }
  }
`
const SiderBar: React.FC = props => {
  const [collapsed, setCollapsed] = useState(false)
  const [authMenu] = useAtom(authMenuAtom)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function flatRoute(menus: any, index = 0, parentPath = '') {
    const newArray: MenuItem[] = []
    menus?.forEach((item: any) => {
      const icons = index === 0 ? <CodeOutlined /> : null
      const path = parentPath + item.path
      if (!isEmpty(item.children)) {
        const child = flatRoute(item.children, index + 1, `${path}/`)
        if (!item.hidden) {
          return newArray.push({
            icon: icons,
            key: path,
            label: item.meta?.title,
            children: child
          })
        }
      }
      if (!item.hidden) {
        return newArray.push({
          icon: icons,
          key: path,
          label: item.meta.title
        })
      }
    })
    return newArray
  }

  function findTreeNodeById(tree: any[], id: string, path = ''): any {
    let result = null
    for (let i = 0; i < tree.length; i++) {
      const item = tree[i]
      const newPath = path ? `${path}/${item.path}` : item.path
      if (newPath === id) {
        return item
      }
      if (!isEmpty(item.children)) {
        result = findTreeNodeById(item.children, id, newPath)
        if (result) {
          return result
        }
      }
    }
    return result
  }

  useLayoutEffect(() => {
    const keys = pathname.split('/')
    let newPathname = pathname
    let selectedPath = findTreeNodeById(authMenu, pathname)
    if (!selectedPath && keys.length > 2) {
      keys.splice(keys.length - 1)
      newPathname = keys.join('/')
      selectedPath = findTreeNodeById(authMenu, newPathname)
    }
    if (selectedPath) {
      setSelectedKeys([newPathname])
      const openArr = pathname.split('/')
      if (openArr.length > 3) {
        openArr.splice(openArr.length - 1)
        setOpenKeys([`/${openArr[1]}`, openArr.join('/')])
      } else {
        setOpenKeys([`/${openArr[1]}`])
      }
    }
  }, [pathname])

  function LinkToPage(e: any) {
    if (e.key !== pathname) {
      navigate(e.key)
    }
  }
  function openChange(e) {
    if (e.length === 2 && !e[1].includes(e[0])) {
      setOpenKeys([e[1]])
    } else {
      setOpenKeys(e)
    }
  }

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      theme="light"
      width={230}
      onChange={() => setCollapsed(!collapsed)}
    >
      <div className="flex items-center pl-5">
        <Link to="/">
          <img src="/logo.png" alt="" className="h-[40px]" />
        </Link>
      </div>
      <MenuStyle
        mode="inline"
        items={flatRoute(authMenu)}
        onClick={LinkToPage}
        onOpenChange={openChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      />
    </Layout.Sider>
  )
}
export default SiderBar
