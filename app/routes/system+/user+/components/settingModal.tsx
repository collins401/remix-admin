import { LockOutlined } from "@ant-design/icons";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useRequest } from "ahooks";
import { Form, Input, Modal, Radio, Select, Spin, TreeSelect } from "antd";
import { useAtom } from "jotai";
import { dictAtomFamily } from "~/atoms/dict";
import request from "~/lib/ofetch";
import { regPhone } from "~/lib/regexp";
interface ModalProps {
  id: string;
}
export default NiceModal.create(({ id }: ModalProps) => {
  const modal = useModal();
  const [form] = Form.useForm();
  const [sys_user_sex] = useAtom(dictAtomFamily("sys_user_sex"));
  const [sys_normal_disable] = useAtom(dictAtomFamily("sys_normal_disable"));
  // const sys_user_sex = [];
  // const sys_normal_disable = [];
  const { data, loading } = useRequest(async () => {
    const res = await request(`/system/user/${id ?? ""}`);
    if (id) {
      form.setFieldsValue(res.data?.data);
    }
    return res.data;
  });
  async function ok() {
    const values = await form.validateFields();
    modal.resolve(values);
    modal.hide();
  }
  return (
    <Modal
      title={id ? "编辑用户" : "新增用户"}
      onOk={ok}
      width={660}
      open={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <Spin spinning={loading}>
        <Form className="!mr-5" form={form} labelCol={{ flex: "90px" }}>
          <div className="grid grid-cols-2 gap-x-5 relative">
            <Form.Item label="用户昵称" name="nickName" rules={[{ required: true }]}>
              <Input maxLength={30} placeholder="请输入用户昵称" />
            </Form.Item>
            <Form.Item label="归属部门" name="deptId">
              <TreeSelect
                allowClear
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                fieldNames={{ label: "label", value: "id" }}
                placeholder="请选择归属部门"
                popupMatchSelectWidth={false}
                showSearch
                treeData={[]}
                treeDefaultExpandAll
                treeNodeFilterProp="label"
              />
            </Form.Item>
            <Form.Item
              label="手机号码"
              name="phonenumber"
              rules={[{ pattern: regPhone, message: "请输入正确手机号码" }]}
            >
              <Input maxLength={11} placeholder="请输入手机号码" />
            </Form.Item>
            <Form.Item
              label="用户邮箱"
              name="email"
              rules={[{ type: "email", message: "请输入正确邮箱格式" }]}
            >
              <Input maxLength={50} placeholder="请输入邮箱" />
            </Form.Item>
            {!id && (
              <Form.Item
                label="登录账号"
                name="userName"
                rules={[{ required: true, message: "请输入登录账号" }]}
              >
                <Input placeholder="请输入登录账号" />
              </Form.Item>
            )}
            {!id && (
              <Form.Item
                label="登录密码"
                name="password"
                rules={[{ required: true, message: "请输入登录密码" }]}
              >
                <Input.Password placeholder="请输入登录密码" />
              </Form.Item>
            )}
            <Form.Item label="用户性别" name="sex">
              <Select options={sys_user_sex} />
            </Form.Item>
            <Form.Item label="状态" name="status">
              <Radio.Group options={sys_normal_disable} />
            </Form.Item>
            <Form.Item label="岗位" name="postIds">
              <Select
                mode="multiple"
                options={data?.posts?.map((s) => ({
                  value: s.postId,
                  label: s.postName,
                  disabled: s.status === "1",
                }))}
                placeholder="请选择岗位"
              />
            </Form.Item>
            <Form.Item label="角色" name="roleIds" rules={[{ required: true }]}>
              <Select
                mode="multiple"
                placeholder="请选择角色"
                options={data?.roles?.map((s) => ({
                  value: s.roleKey,
                  label: s.roleName,
                  disabled: s.status === "1",
                }))}
              />
            </Form.Item>
          </div>
          <Form.Item label="备注" name="remark">
            <Input.TextArea
              autoSize={{ minRows: 4, maxRows: 6 }}
              maxLength={100}
              placeholder="请输入备注"
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
});
