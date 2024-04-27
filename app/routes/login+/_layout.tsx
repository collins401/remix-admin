import { Outlet } from '@remix-run/react'

import placeholder from '~/assets/images/placeholder.svg'

export default function Login() {
  return (
    <div className="flex">
      <div className="md:w-2/5 hidden md:flex items-center justify-center bg-[#EAEAEA] flex-reverse">
        <img src={placeholder} alt="placeholder" className="object-none" />
      </div>
      <div className="flex-1 h-[100vh] bg-white flex-center">
        <Outlet />
      </div>
    </div>
  )
}
