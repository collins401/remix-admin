import { Tabs, type TabsProps } from 'antd';
import { useAtom } from 'jotai';
import { userInfoAtom } from '~/atoms/user';

export default function UcenterPage() {
	const [userInfo] = useAtom(userInfoAtom);
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: '基本信息',
		},
		{
			key: '2',
			label: '角色信息',
		},
		{
			key: '3',
			label: '修改密码',
		},
	];

	function onChange(e) {
		console.log(e);
	}
	return (
		<div>
			<div className="container mx-auto py-10">
				<div className="flex px-5">
					<div className="pr-10">
						<div className="shadow-lg overflow-hidden rounded-lg size-[150px]">
							<img src="/face.jpeg" alt="" className="object-cover" />
						</div>
					</div>
					<div className="flex-1">
						{/* <h3 className="text-3xl font-500">{userInfo?.user?.nickName}</h3> */}
						<h3 className="text-2xl font-500 mb-2">{userInfo?.user?.remark}</h3>
						<p className="text-color/60 text-base">
							{userInfo?.user?.roles?.[0]?.roleName}
						</p>
					</div>
				</div>
			</div>
			<div className="px-5">
				<div className="container mx-auto">
					<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
					<div className="bg-white -mt-4 p-5 rounded-b-md">1</div>
				</div>
			</div>
		</div>
	);
}
