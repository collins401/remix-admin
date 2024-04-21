import { useLocation, useNavigate, useSearchParams } from '@remix-run/react'
import { Form, Input, Modal } from 'antd'

export default function UserIndex() {
  const go = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') as string
  const { state } = useLocation()
  console.log(state)

  function ok() {
    console.log(state)
    go('/system/user?id=1', { replace: true })
  }
  return (
    <Modal open onCancel={() => go(-1)} title={id ? '修改用户' : '添加用户'} onOk={ok}>
      <Form>
        <Form.Item label="用户名">
          <Form.Item name="username" noStyle>
            <Input />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}
