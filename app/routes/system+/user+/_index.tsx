import {
  AppstoreOutlined,
  BarsOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  SearchOutlined,
  UploadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useModal } from "@ebay/nice-modal-react";
import { Link, useNavigate } from "@remix-run/react";
import { useAntdTable } from "ahooks";
import { Button, Form, Input, Segmented, Switch, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/lib/table";
import { useAtom } from "jotai";
import type React from "react";
import { useState } from "react";
import { dictAtomFamily } from "~/atoms/dict";
import { getUserList } from "../api";
import SettingModal from "./components/settingModal";

interface RecordType {
  userId: string;
  userIdName: string;
  phonenumber: string;
  nickName: string;
}

interface Result {
  total: number;
  list: RecordType[];
}

export default function UserList() {
  const go = useNavigate();
  const [form] = Form.useForm();
  // const [sys_normal_disable] = useAtom(dictAtomFamily("sys_normal_disable"));
  const settingModal = useModal(SettingModal);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { tableProps, search } = useAntdTable(
    async ({ current, pageSize }: any, formData: any): Promise<Result> => {
      const params = {
        pageSize,
        pageNum: current,
        ...formData,
      };
      return getUserList(params).then((res) => res.data);
    },
    {
      form,
      cacheKey: "userList",
    }
  );

  const columns: ColumnsType<RecordType> = [
    { title: "用户编码", dataIndex: "userId", ellipsis: true },
    { title: "用户名称", dataIndex: "userName" },
    { title: "用户昵称", dataIndex: "nickName" },
    {
      title: "部门",
      dataIndex: "dept",
      ellipsis: true,
      render: (text) => text?.deptName,
    },
    { title: "手机号码", dataIndex: "phonenumber", ellipsis: true },
    {
      title: "状态",
      dataIndex: "status",
      ellipsis: true,
      render: (e) => <Switch checked={e === "0"} />,
    },
    { title: "创建时间", dataIndex: "createTime", width: 190 },
    {
      title: "操作",
      fixed: "right",
      dataIndex: "action",
      width: 160,
      render: (_, record) => (
        <div className="space-x-2">
          <a onClick={() => setting(record.userId)}>编辑</a>

          <a className="!text-danger">删除</a>
          <EllipsisOutlined />
        </div>
      ),
    },
  ];

  function setting(id?: string) {
    // console.log("add");
    // go("/system/user/setting");
    settingModal.show({ id: id }).then((res) => {
      console.log(res);
    });
  }

  const searchForm = (
    <div className="mb-4 flex-between">
      <Form form={form} layout="inline" onFinish={search.submit} autoComplete="off">
        <Form.Item name="userName">
          <Input
            prefix={<SearchOutlined />}
            className="w-[250px]"
            placeholder="输入姓名/手机号码查询"
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" ghost type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </Form.Item>
      </Form>
      <div className="space-x-4">
        <Button type="primary" icon={<DownloadOutlined />} ghost>
          导出
        </Button>
      </div>
    </div>
  );

  const rowSelection: TableProps<RecordType>["rowSelection"] = {
    selectedRowKeys: selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  return (
    <div className="">
      <div className="border-b flex items-center pb-6 pt-3 px-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-500 text-primary">用户管理</h3>
          <p className="text-color/60">管理系统用户/新增、编辑、删除、授权等功能</p>
        </div>
        <div className="space-x-4">
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => setting()}>
            新增用户
          </Button>
          <Button type="primary" icon={<UploadOutlined />} ghost>
            导入
          </Button>
        </div>
      </div>
      {searchForm}
      <Table
        columns={columns}
        rowSelection={rowSelection}
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
