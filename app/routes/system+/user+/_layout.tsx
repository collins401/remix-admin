import { DownloadOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from '@remix-run/react';
import { useAntdTable } from 'ahooks';
import { Button, Form, Input, Select, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useAtom } from 'jotai';
import { getUserList } from '../api';

import { useEffect } from 'react';
import { dictAtomFamily } from '~/atoms/dict';

interface RecordType {
	userId: number;
	userIdName: string;
	phonenumber: string;
	nickName: string;
}

interface Result {
	total: number;
	list: RecordType[];
}

const getTableData = (
	{ current, pageSize }: any,
	formData: any,
): Promise<Result> => {
	const params = {
		pageSize,
		pageNum: current,
		...formData,
	};

	return getUserList(params).then((res) => ({
		total: res.total,
		list: res.rows,
	}));
};

export default function UserList() {
	const go = useNavigate();
	const [form] = Form.useForm();
	const [sys_normal_disable] = useAtom(dictAtomFamily('sys_normal_disable'));

	const { tableProps, search } = useAntdTable(getTableData, {
		form,
		cacheKey: 'userList',
	});
	const { submit } = search;

	// useEffect(() => {
	//   console.log('pathname', pathname)
	//   if (tableProps.dataSource && pathname === '/system/user') {
	//     refresh()
	//   }
	// }, [pathname])

	const columns: ColumnsType<RecordType> = [
		{ title: '用户编码', dataIndex: 'userId', ellipsis: true },
		{ title: '用户名称', dataIndex: 'userName' },
		{ title: '用户昵称', dataIndex: 'nickName' },
		{
			title: '部门',
			dataIndex: 'dept',
			ellipsis: true,
			render: (text) => text?.deptName,
		},
		{ title: '手机号码', dataIndex: 'phonenumber', ellipsis: true },
		{
			title: '状态',
			dataIndex: 'status',
			ellipsis: true,
			render: (e) => <Switch checked={e === '0'} />,
		},
		{ title: '创建时间', dataIndex: 'createTime', width: 190 },
		{
			title: '操作',
			fixed: 'right',
			dataIndex: 'action',
			render: (_, record) => (
				<div className="space-x-2">
					<Link
						to={`/system/user/setting?id=${record.userId}`}
						state={record}
						prefetch="intent"
					>
						修改
					</Link>
					<Link to="/system/user/role" prefetch="intent">
						分配角色
					</Link>
					<Link to={`/system/user/pwd?id=${record.userId}`} prefetch="intent">
						修改密码
					</Link>
				</div>
			),
		},
	];

	function add() {
		console.log('add');
		go('/system/user/setting');
	}

	const searchForm = (
		<div className="mb-4 flex-between">
			<Form
				form={form}
				layout="inline"
				variant="filled"
				onFinish={submit}
				autoComplete="off"
			>
				<Form.Item name="userName">
					<Input placeholder="用户名" />
				</Form.Item>
				<Form.Item name="phonenumber">
					<Input placeholder="手机号" />
				</Form.Item>
				<Form.Item name="status">
					<Select
						placeholder="状态"
						className="!w-[200px]"
						options={sys_normal_disable}
					/>
				</Form.Item>
				<Form.Item noStyle>
					<Button htmlType="submit" className="!hidden"></Button>
				</Form.Item>
			</Form>
			<div className="space-x-4">
				<Button type="primary" icon={<DownloadOutlined />} ghost>
					导出
				</Button>
				<Button type="primary" icon={<UserAddOutlined />} onClick={add}>
					新增
				</Button>
			</div>
		</div>
	);

	return (
		<div className="bg-white dark:bg-[#141414] rounded p-5 pb-2">
			{searchForm}
			<Table
				columns={columns}
				rowKey="email"
				style={{ overflow: 'auto' }}
				{...tableProps}
			/>
			<Outlet />
		</div>
	);
}
