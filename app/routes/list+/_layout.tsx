import { Outlet } from '@remix-run/react';
import { useAntdTable } from 'ahooks';
import { Form, Segmented } from 'antd';
import { getUserList } from '../system+/api';

import { useState } from 'react';
import SearchForm, { type SearchOption } from '~/components/searchForm';

const getTableData = (
	{ current, pageSize }: any,
	formData: any,
): Promise<any> => {
	const params = {
		pageSize,
		pageNum: current,
		...formData,
	};
	console.log('111');
	return getUserList(params).then((res) => ({
		total: res.total,
		list: res.rows,
	}));
};
const status = [
	{ value: '1', label: '开始' },
	{ value: '0', label: '停止' },
];
export default function List() {
	const [form] = Form.useForm();
	const { search } = useAntdTable(getTableData);
	const [variant, setVariant] = useState<any>('outlined');
	const options: SearchOption[] = [
		{ label: '订单号', name: 'orderNo', itemType: 'input' },
		{ label: '状态1', name: 'ownerPhone', itemType: 'select', options: status },
		{
			label: '业主姓名1',
			name: 'ownerName2',
			itemType: 'rangePicker',
			hidden: true,
		},
		{ label: '状态2', name: 'ownerName', itemType: 'radio', options: status },
	];
	const tabs = ['outlined', 'filled', 'borderless', 'remixPro'];
	const preCode = `<SearchForm form={form} options={options} onChange={search.submit} variant="${variant}" />`;
	return (
		<div className="p-3 rounded bg-white">
			<Segmented<string>
				options={tabs}
				onChange={(value) => {
					console.log(value); // string
					setVariant(value);
				}}
			/>
			<SearchForm
				form={form}
				options={options}
				onChange={search.submit}
				variant={variant}
			/>
			<h3>代码实现：</h3>
			<pre className="bg-black text-white rounded p-2">
				const [form] = Form.useForm()
				<br />
				const options = {JSON.stringify(options, null, 2)}
				<br />
				return ({preCode}
				...)
			</pre>
			<div className=" p-10">12</div>
			<Outlet />
		</div>
	);
}
