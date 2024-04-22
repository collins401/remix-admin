import { useLocation, useNavigate } from '@remix-run/react'
import { lazy, Suspense } from 'react'
import {
  BellOutlined,
  GithubOutlined,
  LockOutlined,
  RollbackOutlined,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Dropdown,
  Layout,
  MenuProps,
  Popover,
  Spin,
  theme,
  App,
  Tooltip
} from 'antd'
import { useAtom } from 'jotai'

import { useDarkMode } from '~/atoms/app'
import { userInfoAtom } from '~/atoms/user'
import { Moon, Sun } from '~/components/svgIcon'
import { HOME_PAGE_URL } from '~/lib/config'

const TodoCalendar = lazy(() => import('./TodoCalendar'))

export default function HeaderBar() {
  const { modal, message } = App.useApp()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [userInfo] = useAtom(userInfoAtom)
  const { pathname } = useLocation()
  const go = useNavigate()
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
  const items: MenuProps['items'] = [
    { label: '用户中心', key: 'ucenter', icon: <UserOutlined /> },
    { label: '修改密码', key: 'pwd', icon: <LockOutlined /> },
    { label: '切换租户', key: 'tenant', icon: <UserSwitchOutlined /> },
    { type: 'divider' },
    { label: '退出登录', key: 'quit', icon: <RollbackOutlined />, danger: true }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key)
    if (key === 'ucenter') {
      go('/ucenter')
    } else if (key === 'quit') {
      modal.confirm({
        title: '系统提示',
        content: '确定注销并退出系统吗？',
        onOk: () => {
          localStorage.clear()
          sessionStorage.clear()
          return new Promise(resolve => {
            setTimeout(() => {
              location.href = '/login'
              resolve(true)
            }, 500)
          })
        }
      })
    }
  }

  function goGithub() {
    window.open('https://github.com')
  }
  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      <div className="flex-between px-5">
        <div>
          {pathname === HOME_PAGE_URL && <span className="text-lg font-500">Welcome~ </span>}
        </div>
        <div className="flex space-x-4 items-center h-[64px]">
          <Tooltip title="源码地址" placement="bottom">
            <Avatar size={36} icon={<GithubOutlined />} onClick={goGithub} />
          </Tooltip>
          <Popover content={content()} placement="bottomRight" arrow={false}>
            <Avatar size={36}>
              <Badge size="small" dot>
                <BellOutlined className="text-lg hover:text-primary" />
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
          <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <div className="text-center cursor-pointer">
              <div className="leading-[16px] mb-1 flex hover:opacity-80">
                {userInfo?.user?.nickName}
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  fill="currentColor"
                  fillRule="evenodd"
                  className="ml-1"
                  height="14"
                >
                  <path d="M454.464 143.68l-253.44 253.44c-12.032 12.032-12.032 31.36 0 43.392 11.968 11.968 31.36 11.968 43.328 0l237.376-237.376 237.376 237.376c11.968 11.968 31.36 11.968 43.328 0 12.032-12.032 12.032-31.36 0-43.392l-253.44-253.44C491.264 126.016 478.016 124.032 454.464 143.68zM507.968 947.648l252.48-253.376c11.968-11.968 11.968-31.36 0-43.392-11.968-11.968-31.296-11.968-43.264 0l-236.48 237.376L244.16 650.88c-11.968-11.968-31.296-11.968-43.264 0-11.968 12.032-11.968 31.424 0 43.392l252.48 253.376C465.984 960 491.136 964.48 507.968 947.648z"></path>
                </svg>
              </div>
              {/* <div className="text-[10px] text-color/60 leading-[14px]">系统管理员</div> */}
            </div>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  )
}
