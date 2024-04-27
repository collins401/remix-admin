import { SaveOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { PageTitle } from '~/components'

export default function ListDetail() {
  return (
    <div>
      <PageTitle
        title="xx详情查看"
        extra={
          <Button type="primary" icon={<SaveOutlined />}>
            保存
          </Button>
        }
      />
      <div className="mt-3 rounded p-4 bg-white">12</div>
    </div>
  )
}
