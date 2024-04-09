import React, { useImperativeHandle, useRef, useState } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { useAtom } from 'jotai'
import { settingDictType } from '../../api'

import { dictAtomFamily } from '~/atoms/dict'

interface Payload {
  title?: string
  onOk?(): void
  [others: string]: any
}

export interface SettingDictTypeRefType {
  show(payload: Payload): void
}

const SettingDictType = React.forwardRef<SettingDictTypeRefType>((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const payloadRef = useRef<Payload>({
    type: 'add'
  })
  const [form] = Form.useForm()
  const [sys_normal_disable] = useAtom(dictAtomFamily('sys_normal_disable'))
  useImperativeHandle(ref, () => ({
    show: (payload: Payload) => {
      payloadRef.current = payload
      setVisible(true)
      form.resetFields()
      if (payload.type === 'edit') {
        form.setFieldsValue(payload.record)
      } else {
        form.setFieldsValue({ status: '0' })
      }
    }
  }))

  const handlerOk = async () => {
    const values = await form.validateFields()
    let params = {}
    if (payloadRef.current.type === 'edit') {
      params = { ...payloadRef.current.record, ...values }
    } else {
      params = { ...values }
    }
    setLoading(true)
    settingDictType(params, payloadRef.current.type)
      .then(res => {
        if (res.code === 200) {
          setVisible(false)
          payloadRef.current.onOk?.()
        } else {
          setVisible(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
    payloadRef.current.onOk?.()
  }

  return (
    <Modal
      afterClose={() => form.resetFields()}
      maskClosable={false}
      okButtonProps={{ loading }}
      onCancel={() => setVisible(false)}
      onOk={handlerOk}
      open={visible}
      title={payloadRef.current.type === 'add' ? '新增字典类型' : '修改字典类型'}
    >
      <Form
        className="!mr-5"
        form={form}
        initialValues={{ status: '0' }}
        labelCol={{ flex: '90px' }}
      >
        <Form.Item
          label="字典名称"
          name="dictName"
          rules={[{ required: true, message: '请输入字典名称' }, { max: 50 }]}
        >
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item
          label="字典类型"
          name="dictType"
          rules={[
            { required: true },
            {
              pattern: /^[a-z][a-z0-9_]+$/,
              message: '字典类型必须以字母开头，且只能为（小写字母，数字，下滑线）'
            },
            { max: 100, message: '最大长度100' }
          ]}
        >
          <Input disabled={payloadRef.current.type === 'edit'} placeholder="请输入字典类型" />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Radio.Group options={sys_normal_disable} />
        </Form.Item>
        <Form.Item label="备注" name="remark" rules={[{ max: 100 }]}>
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  )
})
export default SettingDictType
