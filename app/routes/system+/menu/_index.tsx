import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarsOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  SearchOutlined,
  UploadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useModal } from "@ebay/nice-modal-react";
import { useNavigate } from "@remix-run/react";
import { useAntdTable } from "ahooks";
import { Badge, Button, Form, Input, Switch, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/lib/table";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import type React from "react";
import { useState } from "react";
import { dictAtomFamily } from "~/atoms/dict";
import { getMenus } from "../api";
import SettingMenuModal from "./settingMenu";

interface RecordType {
  menuId: string;
  menuName: string;
  menuType: string;
}

interface Result {
  total: number;
  list: RecordType[];
}
export default function UserList() {
  const go = useNavigate();
  const [form] = Form.useForm();
  const settingMenu = useModal(SettingMenuModal);
  const [sys_normal_disable] = useAtom(dictAtomFamily("sys_normal_disable"));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { tableProps, search, refresh } = useAntdTable(
    async ({ current, pageSize }: any, formData: any): Promise<Result> => {
      const params = {
        pageSize,
        pageNum: current,
        ...formData,
      };
      return getMenus(params).then((res) => ({
        list: res.data,
        total: res.data.length,
      }));
    },
    {
      form,
      cacheKey: "menuList",
    }
  );
  function fmtDate(d: Dayjs) {
    return d ? dayjs(d).format("YYYY-MM-DD HH:mm:ss") : "";
  }
  const columns: ColumnsType<RecordType> = [
    { title: "菜单名称", dataIndex: "menuName" },
    {
      title: "图标",
      dataIndex: "icon",
      width: 70,
    },
    { title: "排序", dataIndex: "orderNum", width: 60 },
    { title: "路由地址", dataIndex: "path" },
    { title: "权限标识", dataIndex: "perms", ellipsis: true, width: 120 },
    { title: "类型", dataIndex: "menuType" },
    {
      title: "状态",
      dataIndex: "status",
      width: 90,
      render: (e) =>
        e === "0" ? <Badge status="success" text="正常" /> : <Badge status="error" text="禁用" />,
    },
    { title: "创建时间", dataIndex: "createTime", render: (e) => fmtDate(e) },
    {
      title: "操作",
      fixed: "right",
      dataIndex: "action",
      width: 160,
      render: (_, record) => (
        <div className="space-x-2">
          <a onClick={() => setting(record.menuId, record)}>编辑</a>
          <a className="!text-danger">删除</a>
          <EllipsisOutlined />
        </div>
      ),
    },
  ];

  function setting(id?: string, record?: RecordType) {
    settingMenu.show({ id: id, record: record }).then(() => {
      refresh();
    });
  }

  const searchForm = (
    <div className="mb-4 flex-between">
      <Form form={form} layout="inline" onFinish={search.submit} autoComplete="off">
        <Form.Item name="menuName">
          <Input prefix={<SearchOutlined />} className="w-[250px]" placeholder="输入菜单名称查询" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" ghost type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div className="">
      <div className="border-b flex items-center pb-6 pt-3 px-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-500 text-primary">菜单管理</h3>
          <p className="text-color/60">管理系统菜单/新增、编辑、删除、授权等功能</p>
        </div>
        <div className="space-x-4">
          <Button type="primary" icon={<AppstoreAddOutlined />} onClick={() => setting()}>
            新增菜单
          </Button>
        </div>
      </div>
      {searchForm}
      <Table
        columns={columns}
        rowKey="userId"
        style={{ overflow: "auto" }}
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: true,
          showTotal: (e) => `共计${e}条记录`,
        }}
      />
    </div>
  );
}
