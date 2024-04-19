import { useLocation, useMatches } from '@remix-run/react'
import React, { createElement, lazy, Suspense } from 'react'
import {
  BellOutlined,
  CaretDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Layout, Popover, Spin, theme } from 'antd'
import { styled } from 'goober'
import { useAtom } from 'jotai'

import { useDarkMode } from '~/atoms/app'
import { userInfoAtom } from '~/atoms/user'
import { Moon, Sun } from '~/components/svgIcon'
import { HOME_PAGE_URL } from '~/lib/config'

const TodoCalendar = lazy(() => import('./TodoCalendar'))
const TriggerMenu = styled('div')`
  background: #f2f2f2;
  line-height: 24px;
  width: 24px;
  font-size: 18px;
  text-align: center;
  border-radius: 2px;
  transition: all 0.2s linear;
  color: #333;
  &:hover {
    cursor: pointer;
    background: #dcdbdb;
  }
`
interface IProps {
  collapsed: boolean
  onChange: (collapsed: boolean) => void
}

export default function HeaderBar(props: IProps) {
  const { collapsed, onChange } = props
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [userInfo] = useAtom(userInfoAtom)
  const { pathname } = useLocation()
  const m = useMatches()
  // console.log(m)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  function content() {
    return (
      <Suspense fallback={<Spin size="small" />}>
        <TodoCalendar />
      </Suspense>
    )
  }
  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      <div className="flex-between px-5">
        <div>
          {pathname === HOME_PAGE_URL && <span className="text-lg font-500">Welcome~ </span>}
        </div>
        <div className="flex space-x-4 items-center h-[64px]">
          <Popover content={content()} placement="bottomRight" arrow={false}>
            <Avatar size={36}>
              <Badge size="small" dot>
                <BellOutlined className=" text-lg hover:text-primary" />
              </Badge>
            </Avatar>
          </Popover>
          <Avatar
            size={36}
            onClick={toggleDarkMode}
            icon={
              darkMode === 'dark' ? (
                <Sun fill="currentColor" className="text-white size-[20px]" />
              ) : (
                <Moon fill="currentColor" className="text-black size-[20px]" />
              )
            }
          />
          <Avatar size={36} src="/avatar.jpeg" />
          <div className="text-center">
            <div className="leading-[16px] mb-1">
              {userInfo?.user?.nickName}
              <CaretDownOutlined className="text-color/40" />
            </div>
            <div className="text-[10px] text-color/60 leading-[14px]">系统管理员</div>
          </div>
        </div>
      </div>
    </Layout.Header>
  )
}
