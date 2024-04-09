import { useLoaderData, useRevalidator } from '@remix-run/react'
import { useState } from 'react'
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import { App, Button, ConfigProvider, Form, Input } from 'antd'

import { LOGIN_TOKEN_KEY, SITE_TITLE } from '~/lib/config'
import fetch from '~/lib/ofetch'

export const clientLoader = async () => {
  return await fetch('/captchaImage')
}
export default function Login() {
  const [form] = Form.useForm()
  const { message } = App.useApp()
  const [loading, setLoading] = useState(false)
  const revalidator = useRevalidator()
  const captcha = useLoaderData<typeof clientLoader>()

  async function finish() {
    const values = await form.validateFields()
    setLoading(true)
    fetch('/login', { method: 'POST', body: { ...values, uuid: captcha?.uuid } }).then(
      (res: any) => {
        if (res.code === 200) {
          localStorage.setItem(LOGIN_TOKEN_KEY, res.token)
          setTimeout(() => {
            window.location.href = '/'
          }, 100)
        } else {
          message.error(res.msg)
          form.setFieldValue('code', '')
          revalidator.revalidate()
          setLoading(false)
        }
      }
    )
  }
  return (
    <div className="flex">
      <div className="lg:w-1/2 hidden lg:flex flex-center bg-gray-100"></div>
      <div className="flex-1 h-[100vh] flex-center  dark:bg-black">
        <div className="mx-auto rounded-md shadow-[-1px 4px 34px 0 rgba(138,185,255,.2)] p-2 md:p-10 md:pb-4  max-w-[450px]">
          <h3 className="text-center mb-5 text-xl font-500">{SITE_TITLE}</h3>
          <ConfigProvider theme={{ token: { borderRadius: 2 } }}>
            <Form autoComplete="off" form={form} onFinish={finish} size="large">
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户码' }]}>
                <Input
                  placeholder="请输入用户名"
                  prefix={<UserOutlined className="text-primary" />}
                />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password
                  placeholder="输入密码"
                  prefix={<LockOutlined className="text-primary" />}
                />
              </Form.Item>
              <div className="flex">
                <div className="flex-1">
                  <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
                    <Input
                      placeholder="请输入验证码"
                      prefix={<SafetyCertificateOutlined className="text-primary" />}
                    />
                  </Form.Item>
                </div>
                <div className="w-[96px] ml-2">
                  {captcha?.img && (
                    <img
                      alt="captcha"
                      className="h-[40px]"
                      onClick={() => revalidator.revalidate()}
                      src={`data:image/gif;base64,${captcha?.img}`}
                    />
                  )}
                </div>
              </div>
              <Form.Item>
                <Button block htmlType="submit" loading={loading} type="primary">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}
