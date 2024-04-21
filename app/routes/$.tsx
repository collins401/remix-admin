import { useNavigate } from '@remix-run/react'
import { SwapLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import ERROR from '~/assets/images/404.svg'

function NotFound() {
  const go = useNavigate()
  return (
    <div className="text-center pt-[100px]">
      <img alt="404" className="h-[300px] mx-auto" src={ERROR} />
      <h3 className="-mt-10 mb-3 text-base text-color/60">抱歉~，您要访问的页面不存在！</h3>
      <div>
        <Button icon={<SwapLeftOutlined />} onClick={() => go('/')} type="primary">
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default NotFound
