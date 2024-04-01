import { Layout, theme } from 'antd'
import { useAtom } from 'jotai'

import { userInfoAtom } from '~/atoms/user'

export default function HeaderBar() {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const [userInfo] = useAtom(userInfoAtom)
  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      HEADER-{userInfo?.user?.nickName}
    </Layout.Header>
  )
}
