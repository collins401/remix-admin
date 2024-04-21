import { useNavigate } from '@remix-run/react'
import { Modal } from 'antd'

export default function UserIndex() {
  const go = useNavigate()
  return (
    <Modal open onCancel={() => go(-1)}>
      pwd
    </Modal>
  )
}
