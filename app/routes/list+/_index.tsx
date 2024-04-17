import { Link } from '@remix-run/react'
import { useAntdTable } from 'ahooks'
import { Form, Segmented, theme } from 'antd'
import { getUserList } from '../system+/api'

import code1 from '~/assets/images/code1.png'
import SearchForm, { SearchOption } from '~/components/searchForm'

const getTableData = ({ current, pageSize }: any, formData: any): Promise<any> => {
  const params = {
    pageSize,
    pageNum: current,
    ...formData
  }
  console.log('111')
  return getUserList(params).then(res => ({
    total: res.total,
    list: res.rows
  }))
}

export default function List() {
  const [form] = Form.useForm()
  const { token } = theme.useToken()
  const { tableProps, loading, search } = useAntdTable(getTableData)
  const options: SearchOption[] = [
    { label: '订单号', name: 'orderNo', itemType: 'input' },
    { label: '业主电话', name: 'ownerPhone', itemType: 'select', options: [] },
    { label: '业主姓名', name: 'ownerName', itemType: 'input' },
    { label: '业主姓名1', name: 'ownerName2', itemType: 'rangePicker' }
  ]
  const tabs = ['常规搜索', '联动搜索', '展开/折叠', '动态数据']
  return (
    <div className="p-3 rounded" style={{ background: token.colorBgContainer }}>
      <Segmented<string>
        options={tabs}
        onChange={value => {
          console.log(value) // string
        }}
      />
      <SearchForm form={form} options={options} onChange={search.submit} variant="outlined" />
      <h3>代码实现：</h3>
      <div style={{ background: token.colorFillAlter }} className="">
        <img src={code1} alt="code1" />
      </div>
      <Link to="/list/detail">to detail</Link>
      <div className=" p-10">12</div>
    </div>
  )
}
