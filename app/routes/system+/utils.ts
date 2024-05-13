import { createElement } from 'react'
import { Badge } from 'antd'
export const menuTypes = [
  { value: 'M', label: '目录' },
  { value: 'C', label: '菜单' },
  { value: 'F', label: '按钮' }
]

export const changeMenuType = (val: string) => {
  const obj = menuTypes.find(s => s.value === val)
  return obj ? obj.label : ''
}

export const changeStatus = (list: any, val: string) => {
  const obj = list?.find(s => s.value === val)
  if (!obj) return val || ''
  return createElement(Badge, { status: val === '0' ? 'processing' : 'error', text: obj.label })
}
