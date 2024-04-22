import { useRef } from 'react'
import { App, Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useAtom } from 'jotai'
import { delDictValue } from '../../api'
import SettingDictValue, { SettingDictValueRefType } from './SettingDictValue'

import { dictAtomFamily } from '~/atoms/dict'

interface DictRecordType {
  dictCode: number
  dictLabel: string
  dictValue: string
  status: string
}

export default function ShowDictValue({ dictType }: { dictType: string }) {
  const { modal, message } = App.useApp()
  const [dict, updateDict] = useAtom(dictAtomFamily(dictType))
  const dictValueRef = useRef<SettingDictValueRefType>(null)
  function delDictValueFun(item: DictRecordType) {
    modal.confirm({
      title: '系统提示',
      content: `是否确认删除字典编号为"${item.dictCode}"的数据项？`,
      okType: 'danger',
      onOk: async () => {
        return new Promise((resolve, reject) => {
          delDictValue(item.dictCode)
            .then(res => {
              if (res.code === 200) {
                message.success('删除成功')
                updateDict()
                resolve(true)
              } else {
                reject(false)
                updateDict()
              }
            })
            .catch(e => {
              reject(e)
            })
        })
      }
    })
  }

  function setDictValue(item?: DictRecordType) {
    dictValueRef.current?.show({
      title: '编辑字典类型',
      type: item ? 'edit' : 'add',
      record: item || { dictType: dictType },
      onOk: () => {
        updateDict()
      }
    })
  }
  const columns: ColumnsType<DictRecordType> = [
    { title: '字典编码', dataIndex: 'dictCode' },
    { title: '字典标签', dataIndex: 'dictLabel' },
    { title: '字典键值', dataIndex: 'dictValue' },
    { title: '状态', dataIndex: 'status' },
    { title: '备注', dataIndex: 'remark' },
    { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      dataIndex: 'action',
      width: 110,
      render: (_, record) => (
        <div className="space-x-3">
          <a onClick={() => setDictValue(record)}>编辑</a>
          <a className="!text-danger" onClick={() => delDictValueFun(record)}>
            删除
          </a>
        </div>
      )
    }
  ]
  return (
    <div className="mt-3">
      <div className="text-right mb-4">
        <Button onClick={() => setDictValue()} type="primary">
          新增字典
        </Button>
      </div>
      <Table columns={columns} dataSource={dict || []} rowKey="dictCode" />
      <SettingDictValue ref={dictValueRef} />
    </div>
  )
}
