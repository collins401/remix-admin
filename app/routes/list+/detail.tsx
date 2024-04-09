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
      <div className="bg-white mt-3 rounded p-4">12</div>
    </div>
  )
}
