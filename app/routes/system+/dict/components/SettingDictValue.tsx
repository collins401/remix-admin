import React, { useImperativeHandle, useRef, useState } from 'react'
import { Form, Input, InputNumber, Modal, Radio } from 'antd'
import { useAtom } from 'jotai'
import { settingDictData } from '../../api'

import { dictAtomFamily } from '~/atoms/dict'

interface Payload {
  title?: string
  onOk?(): void
  [others: string]: any
}

export interface SettingDictValueRefType {
  show(payload: Payload): void
}

const SettingDictValue = React.forwardRef<SettingDictValueRefType>((_, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const payloadRef = useRef<Payload>({})
  const [form] = Form.useForm()
  const [sys_normal_disable] = useAtom(dictAtomFamily('sys_normal_disable'))

  useImperativeHandle(ref, () => ({
    show: (payload: Payload) => {
      payloadRef.current = payload
      setVisible(true)
      form.setFieldsValue(payload.record)
    }
  }))

  const handlerOk = async () => {
    let value = await form.validateFields()
    if (payloadRef.current.type === 'edit') {
      value = { ...payloadRef.current.record, ...value }
    }
    setLoading(true)
    settingDictData(value, payloadRef.current.type)
      .then(res => {
        if (res.code === 200) {
          setVisible(false)
          payloadRef.current.onOk?.()
        } else {
          // setLoading(false)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal
      afterClose={() => form.resetFields()}
      maskClosable={false}
      okButtonProps={{ loading }}
      onCancel={() => setVisible(false)}
      onOk={handlerOk}
      open={visible}
      title={payloadRef.current.type === 'add' ? '新增字典' : '编辑字典'}
    >
      <Form
        className="!mr-5"
        form={form}
        initialValues={{ status: '0' }}
        labelCol={{ flex: '90px' }}
      >
        <Form.Item label="字典类型" name="dictType" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="数据标签" name="dictLabel" rules={[{ required: true }, { max: 50 }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="数据键值"
          name="dictValue"
          rules={[
            { required: true },
            { pattern: /^[a-zA-Z0-9/\-_./]+$/, message: '请输入数字、字符,不允许特殊字符' },
            { max: 50, message: '最大长度50' }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="显示排序" name="dictSort" rules={[{ required: true }]}>
          <InputNumber
            className="!w-[200px]"
            max={100}
            min={0}
            placeholder="请输入"
            precision={0}
          />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={[{ required: true }]}>
          <Radio.Group options={sys_normal_disable} />
        </Form.Item>
        <Form.Item label="备注" name="remark" rules={[{ max: 100 }]}>
          <Input.TextArea maxLength={100} placeholder="请输入" showCount />
        </Form.Item>
      </Form>
    </Modal>
  )
})
export default SettingDictValue
