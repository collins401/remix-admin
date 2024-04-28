import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useLoaderData, useRevalidator } from '@remix-run/react';
import { App, Input, Tooltip } from 'antd';
import { Suspense, useRef, useState } from 'react';
import { delDictType, getDictTypeList } from '../api';
import SettingMenuModal, {
	type SettingDictTypeRefType,
} from './components/SettingDictType';
import ShowDictValue from './components/ShowDictValue';

import { Loading } from '~/components';

interface DictType {
	dictId: number;
	dictName: string;
	dictType: string;
	status: string;
	remark: string;
	createTime: string;
}
export async function clientLoader() {
	return await getDictTypeList();
}
clientLoader.hydrate = true;

export default function Dict() {
	const { rows: dictTypeList } = useLoaderData<typeof clientLoader>();

	const { message, modal } = App.useApp();
	const revalidate = useRevalidator();
	const [keyword, setKeyword] = useState('');
	const [selectedDictType, setSelectedDictType] = useState<DictType>(
		dictTypeList[0],
	);
	const dictRef = useRef<SettingDictTypeRefType>(null);

	function selectDictType(item: DictType) {
		setSelectedDictType(item);
	}

	function delDict(rows: DictType) {
		modal.confirm({
			title: '系统提示',
			content: `是否确认删除字典类型为"${rows?.dictName}"的数据项？`,
			okType: 'danger',
			onOk: async () => {
				return new Promise((resolve, reject) => {
					delDictType(rows.dictId)
						.then((res) => {
							if (res.code === 200) {
								message.success('删除成功');
								revalidate.revalidate();
								resolve(true);
							} else {
								reject(false);
							}
						})
						.catch((e) => {
							reject(e);
						});
				});
			},
		});
	}

	function settingDictType(item?: DictType) {
		dictRef.current?.show({
			type: item ? 'edit' : 'add',
			record: item || {},
			onOk: revalidate.revalidate,
		});
	}

	return (
		<>
			<div className="flex">
				<div className="w-260px mr-4 bg-white rounded">
					<div className="flex m-3 mb-2 items-center space-x-3">
						<Input
							className="flex-1"
							onChange={(e) => setKeyword(e.target.value)}
							placeholder="输入类型查询"
							value={keyword}
						/>
						<Tooltip placement="top" title="新增类型">
							<PlusOutlined
								className="text-primary cursor-pointer font-500"
								onClick={() => settingDictType()}
							/>
						</Tooltip>
					</div>
					<div className="mx-3 pb-2 max-h-[calc(100vh-170px)] overflow-auto">
						{dictTypeList
							?.filter((s) => s.dictName?.indexOf(keyword) !== -1)
							?.map((item) => (
								<div
									className={`leading-9 group my-1 flex-between px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-black ${
										selectedDictType?.dictType === item.dictType
											? ' bg-primary/10 text-primary'
											: ''
									}`}
									key={item.dictId}
									onClick={() => selectDictType(item)}
								>
									<div>{item.dictName}</div>
									<div
										className={`space-x-2 hidden ${
											selectedDictType?.dictType === item.dictType
												? '!block'
												: ''
										}`}
									>
										<Tooltip placement="top" title="编辑">
											<EditOutlined
												className="text-primary"
												onClick={(e) => {
													e.stopPropagation();
													settingDictType(item);
												}}
											/>
										</Tooltip>
										<Tooltip placement="top" title="删除">
											<MinusOutlined
												className="text-danger"
												onClick={(e) => {
													e.stopPropagation();
													delDict(item);
												}}
											/>
										</Tooltip>
									</div>
								</div>
							))}
					</div>
				</div>
				<div className="flex-1 bg-white dark:bg-[#141414] rounded p-4">
					<h3 className="pl-3 text-base border-l-4 border-primary">基本信息</h3>
					<div className="grid grid-cols-3 gap-3 my-5">
						<div>
							<span className="text-color/60">字典名称：</span>
							<span className="text-primary font-500">
								{' '}
								{selectedDictType?.dictName}
							</span>
						</div>
						<div>
							<span className="text-color/60">字典类型：</span>{' '}
							{selectedDictType?.dictType}
						</div>
						<div>
							<span className="text-color/60">字典编号：</span>{' '}
							{selectedDictType?.dictId}
						</div>
						<div>
							<span className="text-color/60">状态：</span>
							{selectedDictType?.status === '0' ? '正常' : '停用'}
						</div>
						<div>
							<span className="text-color/60">备注：</span>{' '}
							{selectedDictType?.remark}
						</div>
						<div>
							<span className="text-color/60">创建时间：</span>{' '}
							{selectedDictType?.createTime}
						</div>
					</div>
					<h3 className="pl-3 mt-6 text-base border-l-4 border-primary">
						字典标签
					</h3>
					<Suspense fallback={<Loading className="!pt-20" />}>
						{selectedDictType.dictType && (
							<ShowDictValue dictType={selectedDictType.dictType} />
						)}
					</Suspense>
				</div>
			</div>
			<SettingMenuModal ref={dictRef} />
		</>
	);
}
