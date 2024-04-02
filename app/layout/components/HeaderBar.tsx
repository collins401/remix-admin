import { Layout, Switch, theme } from 'antd'
import { useAtom } from 'jotai'

import { useDarkMode } from '~/atoms/app'
import { userInfoAtom } from '~/atoms/user'

export default function HeaderBar() {
  const { darkMode, toggleDarkMode } = useDarkMode()
  console.log('darkMode', darkMode)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const [userInfo] = useAtom(userInfoAtom)
  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      HEADER-{userInfo?.user?.nickName}
      <Switch checked={darkMode === 'dark' ? true : false} onChange={toggleDarkMode} />
    </Layout.Header>
  )
}
