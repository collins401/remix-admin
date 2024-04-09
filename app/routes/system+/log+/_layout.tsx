import { Outlet } from '@remix-run/react'

export default function LogLayout() {
  return (
    <div>
      log-layout
      <Outlet />
    </div>
  )
}
