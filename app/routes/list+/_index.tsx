import { Link } from '@remix-run/react'
import { useAntdTable } from 'ahooks'
import { Form } from 'antd'
import { getUserList } from '../system+/api'

import SearchForm, { SearchOption } from '~/components/SearchForm'

const getTableData = ({ current, pageSize }: any, formData: any): Promise<any> => {
  const params = {
    pageSize,
    pageNum: current,
    ...formData
  }

  return getUserList(params).then(res => ({
    total: res.total,
    list: res.rows
  }))
}

export default function List() {
  const [form] = Form.useForm()
  const { tableProps, loading, search } = useAntdTable(getTableData)
  const options: SearchOption[] = [
    { label: '订单号', name: 'orderNo', itemType: 'input' },
    { label: '业主电话', name: 'ownerPhone', itemType: 'select', options: [] },
    { label: '业主姓名', name: 'ownerName', itemType: 'input' },
    { label: '业主姓名1', name: 'ownerName2', itemType: 'rangePicker' }
  ]
  return (
    <div>
      <SearchForm form={form} options={options} onChange={search.submit} />
      <Link to="/list/detail">to detail</Link>
      <div className="bg-white p-10">12</div>
    </div>
  )
}
