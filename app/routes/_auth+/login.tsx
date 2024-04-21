import { useLoaderData, useRevalidator } from '@remix-run/react'
import { useState } from 'react'
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import { App, Button, ConfigProvider, Form, Input, theme } from 'antd'
import { styled } from 'goober'

import placeholder from '~/assets/images/login.png'
import { LOGIN_TOKEN_KEY, SITE_TITLE } from '~/lib/config'
import fetch from '~/lib/ofetch'

const FormStyle = styled(Form)`
  /* 去除input自动填充的背景颜色 */
  input {
    background-clip: content-box !important;
    &::first-line {
      color: white !important; // 设置输入内容的样式
    }
    -webkit-text-fill-color: #dcfdff; // 改变了字体颜色
  }
  input:-webkit-autofill {
    box-shadow: 0 0 0 1000px transparent inset !important;
  }
  input::-internal-autofill-previewed,
  input::-internal-autofill-selected {
    transition: background-color 5000s ease-in-out 0s !important;
    background-image: none !important;
  }
`
export const clientLoader = async () => {
  return await fetch('/captchaImage')
}
export default function Login() {
  const [form] = Form.useForm()
  const { token } = theme.useToken()
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
      <div className="md:w-3/5 hidden md:flex items-center justify-center bg-[#EAEAEA] flex-reverse">
        <img src={placeholder} alt="placeholder" className="max-w-[450px]" />
      </div>
      <div className="flex-1 h-[100vh] flex-center" style={{ background: token.colorBgContainer }}>
        <div className="mx-auto rounded-md shadow-[-1px 4px 34px 0 rgba(138,185,255,.2)] p-2 md:p-10 md:pb-4  max-w-[450px]">
          <div className="text-3xl text-center text-primary font-500 mb-14">
            <div className="inline-block relative">
              <span className="absolute left-10 bottom-0 h-[12px] bg-orange-200 -right-2 inline-block rounded-md"></span>
              <span className="relative z-1">🙌欢迎使用 {SITE_TITLE}</span>
            </div>
          </div>
          <ConfigProvider theme={{ token: { borderRadius: 4, lineHeightLG: 2.61 } }}>
            <FormStyle
              variant="filled"
              autoComplete="off"
              form={form}
              onFinish={finish}
              size="large"
            >
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户码' }]}>
                <Input
                  placeholder="请输入用户名"
                  prefix={<UserOutlined className="text-primary text-lg" />}
                  className="autofill:bg-red-200"
                  // style={{ backgroundClip: 'content-box' }}
                />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password
                  placeholder="输入密码"
                  prefix={<LockOutlined className="text-primary text-lg" />}
                />
              </Form.Item>
              <div className="flex">
                <div className="flex-1">
                  <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
                    <Input
                      placeholder="请输入验证码"
                      prefix={<SafetyCertificateOutlined className="text-primary text-lg" />}
                    />
                  </Form.Item>
                </div>
                <div className="w-[96px] ml-2">
                  {captcha?.img && (
                    <img
                      alt="captcha"
                      className="h-[52px]"
                      onClick={() => revalidator.revalidate()}
                      src={`data:image/gif;base64,${captcha?.img}`}
                    />
                  )}
                </div>
              </div>
              <Form.Item>
                <Button
                  block
                  htmlType="submit"
                  loading={loading}
                  type="primary"
                  className="h-[52px]"
                >
                  登录
                </Button>
              </Form.Item>
            </FormStyle>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}
