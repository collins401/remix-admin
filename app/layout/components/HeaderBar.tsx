import { useLocation } from '@remix-run/react'
import { lazy, Suspense } from 'react'
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons'
import { Avatar, Badge, Layout, Popover, Spin, theme } from 'antd'
import { useAtom } from 'jotai'

import { useDarkMode } from '~/atoms/app'
import { userInfoAtom } from '~/atoms/user'
import { Moon, Sun } from '~/components/svgIcon'
import { HOME_PAGE_URL } from '~/lib/config'

const TodoCalendar = lazy(() => import('./TodoCalendar'))

export default function HeaderBar() {
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [userInfo] = useAtom(userInfoAtom)
  const { pathname } = useLocation()
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
          <Avatar size={36} src="/avatar.jpg" />
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
