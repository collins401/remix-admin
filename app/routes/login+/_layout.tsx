import { Link, Outlet } from '@remix-run/react'
import { theme } from 'antd'

import placeholder from '~/assets/images/placeholder.svg'

export default function Login() {
  const { token } = theme.useToken()
  return (
    <div className="flex">
      <div className="md:w-2/5 hidden md:flex items-center justify-center bg-[#EAEAEA] flex-reverse">
        <img src={placeholder} alt="placeholder" className="object-none" />
      </div>
      <div className="flex-1 h-[100vh] flex-center" style={{ background: token.colorBgContainer }}>
        <Outlet />
      </div>
    </div>
  )
}
