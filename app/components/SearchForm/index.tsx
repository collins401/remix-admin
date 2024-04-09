import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useSize } from 'ahooks'
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, theme } from 'antd'
import type { FormInstance, FormProps } from 'antd/lib/form'
import { omit } from 'lodash-es'
import type { SearchOption } from './types.d'

interface SearchConfig extends FormProps {
  options: SearchOption[]
  form: FormInstance
  grid?: string
  loading?: boolean
  searchBtnLeft?: boolean
  searchBtnText?: string
  restBtnText?: string
  onResize?: (height: any) => void
  onChange?: (v: any) => void
  onReset?: () => void
  hideBtn?: boolean
  children?: React.ReactNode
}

export type { SearchConfig, SearchOption }

const { RangePicker } = DatePicker

const SearchForm: React.FC<SearchConfig> = props => {
  const {
    onChange,
    onReset,
    onResize,
    options,
    form,
    loading,
    grid = '',
    searchBtnLeft = false,
    searchBtnText = '查询',
    restBtnText = '重置',
    hideBtn = false,
    children,
    ...formRest
  } = props

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const ref = useRef(null)
  const size = useSize(ref)
  const [itemOptions, setItemOptions] = useState<SearchOption[]>([])

  useLayoutEffect(() => {
    setItemOptions(options)
  }, [options])

  useEffect(() => {
    if (size?.height) {
      onResize?.(size?.height)
    }
  }, [size, onResize])

  function finish() {
    form.validateFields().then(values => {
      onChange?.(values)
    })
  }

  function reset() {
    if (onReset) {
      onReset()
    } else {
      form.resetFields()
    }
  }

  function itemRender(item: SearchOption) {
    const itemType = item.itemType
    switch (itemType) {
      case 'input':
        return <Input allowClear placeholder={item.placeholder ?? '请输入'} {...item.fieldProps} />
      case 'radio':
        return <Radio.Group options={item.options} {...item.fieldProps} />
      case 'checkbox':
        return <Checkbox.Group options={item.options} {...item.fieldProps} />
      case 'select':
        return (
          <Select
            allowClear
            optionFilterProp="label"
            options={item.options}
            placeholder={item.placeholder ?? '请选择'}
            showSearch
            {...item.fieldProps}
          />
        )
      // case 'cascader':
      //   return <Cascader showSearch options={item.options} {...item.fieldProps} />
      case 'datePicker':
        return (
          <DatePicker
            className="w-full"
            placeholder={item.placeholder ?? '请选择日期'}
            {...item.fieldProps}
          />
        )
      case 'rangePicker':
        return <RangePicker className="w-full" {...item.fieldProps} />
      // 自定义组件
      case 'custom':
        return item.render
      // 隐藏域，用于存储一些非常规字段
      case 'hidden':
        return <Input className="hidden" type="hidden" {...item.fieldProps} />
      default:
        break
    }
  }

  return (
    <div className="p-6 pb-1 mb-3  rounded" style={{ background: colorBgContainer }} ref={ref}>
      <Form
        autoComplete="off"
        form={form}
        id="searchform"
        onFinish={finish}
        {...formRest}
        variant="filled"
      >
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-5 relative ${grid}`}
        >
          {itemOptions.map((item, i) => {
            const restItem: any = omit(item, [
              'fieldProps',
              'options',
              'itemType',
              'hidden',
              'list'
            ])
            if (item.hidden) {
              return (
                <Form.Item key={i} noStyle shouldUpdate>
                  {({ getFieldValue }) =>
                    getFieldValue([item.hidden[0]]) !== item.hidden[1] && (
                      <Form.Item {...restItem}>{itemRender(item)}</Form.Item>
                    )
                  }
                </Form.Item>
              )
            } else {
              return (
                <Form.Item key={item.name} {...restItem}>
                  {itemRender(item)}
                </Form.Item>
              )
            }
          })}
          {children}
          {!hideBtn && (
            <div>
              {!searchBtnLeft && <div className="h-[56px] text-transparent" />}
              <div
                className={`space-x-2.5 ${searchBtnLeft ? '' : 'absolute right-0 bottom-[22px]'}`}
              >
                <Button onClick={reset}>{restBtnText}</Button>
                <Button
                  htmlType="submit"
                  loading={loading}
                  type="primary"
                  icon={<SearchOutlined />}
                >
                  {searchBtnText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Form>
    </div>
  )
}

export default SearchForm
