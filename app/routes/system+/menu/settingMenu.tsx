import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Form, Input, InputNumber, Modal, Radio, Select, TreeSelect, message } from "antd";
import { isEmpty } from "lodash-es";
import { createElement, useImperativeHandle, useRef, useState } from "react";
import { settingMenu } from "../api";
import { menuTypes } from "../utils";
import menuIcons from "./menuIcons";
export interface RecordType {
  menuId: number;
  menuName: string;
  orderNum: number;
  perms: string;
  status: string;
  createTime: string;
  updateTime: string;
  children: RecordType[];
}
interface Payload {
  type: "add" | "edit";
  record?: RecordType;
  onOk?: () => void;
  [others: string]: any;
}

export interface SettingMenuModalType {
  id?: string;
  record?: any;
}

const isNot = [
  { label: "是", value: "0" },
  { label: "否", value: "1" },
];
const menuStatus = [
  { label: "正常", value: "0" },
  { label: "停用", value: "1" },
];
const showStatus = [
  { label: "显示", value: "0" },
  { label: "隐藏", value: "1" },
];

export default NiceModal.create(({ id, record }: SettingMenuModalType) => {
  const [form] = Form.useForm();
  const modal = useModal();
  const [loading, setLoading] = useState(false);

  const [menuTree, setMenuTree] = useState<any[]>([]);

  function disabledTree(data: any) {
    data.forEach((element) => {
      if (element.menuType === "F" || element.isFrame === "0") {
        element.disabled = true;
      }
      if (!isEmpty(element.children)) {
        disabledTree(element.children);
      }
    });
  }

  const onOk = async () => {
    const res = await form.validateFields();
    console.log(res);
    let params: any = res;
    if (id) {
      params = {
        ...record,
        ...res,
      };
    }
    setLoading(true);
    settingMenu(params, id ? "edit" : "add")
      .then((result) => {
        if (result.code === 200) {
          message.success("设置成功");
          modal.hide();
          modal.resolve();
        } else {
          message.warning(result.msg);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function newMapToList(map: any) {
    const list: any[] = [];
    map.forEach((value: any, key: any) => {
      list.push({
        value: key,
        label: value,
      });
    });
    return list;
  }
  return (
    <Modal
      afterClose={modal.remove}
      maskClosable={false}
      okButtonProps={{ loading }}
      onCancel={modal.hide}
      onOk={onOk}
      open={modal.visible}
      title={id ? "编辑菜单" : "新增菜单"}
      width={550}
    >
      <Form
        autoComplete="off"
        className="!mt-5"
        form={form}
        initialValues={{ menuType: "C", isFrame: "1", status: "0", visible: "0" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item label="上级菜单" name="parentId" rules={[{ required: true }]}>
          <TreeSelect
            fieldNames={{ label: "menuName", value: "menuId", children: "children" }}
            onSelect={(e, m) => {
              console.log(e, m);
            }}
            showSearch
            treeData={menuTree}
          />
        </Form.Item>
        <Form.Item label="菜单类型" name="menuType">
          <Radio.Group options={menuTypes} />
        </Form.Item>
        <Form.Item label="菜单名称" name="menuName" rules={[{ required: true }]}>
          <Input placeholder="输入菜单名称" />
        </Form.Item>
        <Form.Item label="显示排序" name="orderNum" rules={[{ required: true }]}>
          <InputNumber className="!w-300px" min={0} placeholder="请输入" precision={0} />
        </Form.Item>
        <Form.Item
          label="权限字符"
          name="perms"
          rules={[
            { required: true },
            {
              pattern: /^[a-z][a-z:]+$/,
              message: "字典类型必须以小写字母开头，且只能为小写字母+冒号",
            },
            { max: 50, message: "最大长度50" },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item noStyle shouldUpdate={(prev, current) => prev.menuType !== current.menuType}>
          {({ getFieldValue }) => {
            if (getFieldValue("menuType") === "F") {
              return <div> </div>;
            }
            if (getFieldValue("menuType") === "C") {
              return (
                <>
                  <Form.Item
                    label="路由地址"
                    name="path"
                    rules={[{ required: true }, { max: 200, message: "最大长度200" }]}
                    tooltip="访问的路由地址，如：`user`，如外网地址需链接访问则以`http(s)://`开头"
                  >
                    <Input placeholder="请输入" />
                  </Form.Item>
                  <Form.Item label="路由参数" name="query">
                    <Input placeholder="请输入" />
                  </Form.Item>
                  <Form.Item
                    label="菜单状态"
                    name="status"
                    tooltip="如路由停用则将不会出现在侧边栏，也不能被访问"
                  >
                    <Radio.Group options={menuStatus} />
                  </Form.Item>
                  <Form.Item
                    label="显示状态"
                    name="visible"
                    tooltip="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
                  >
                    <Radio.Group options={showStatus} />
                  </Form.Item>
                </>
              );
            }
            return (
              <>
                <Form.Item label="菜单图标" name="icon" tooltip="只有最顶层的菜单才能显示图标">
                  <Select showSearch>
                    {newMapToList(menuIcons).map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        {createElement(item.label)}
                        {item.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="路由地址"
                  name="path"
                  rules={[{ required: true }, { max: 200, message: "最大长度200" }]}
                  tooltip="访问的路由地址，如：`user`，如外网地址需链接访问则以`http(s)://`开头"
                >
                  <Input placeholder="请输入" />
                </Form.Item>

                <Form.Item
                  label="是否外链"
                  name="isFrame"
                  tooltip="选择外链则路由地址需要以`http(s)://`开头"
                >
                  <Radio.Group options={isNot} />
                </Form.Item>
                <Form.Item
                  label="菜单状态"
                  name="status"
                  tooltip="如路由停用则将不会出现在侧边栏，也不能被访问"
                >
                  <Radio.Group options={menuStatus} />
                </Form.Item>
                <Form.Item
                  label="显示状态"
                  name="visible"
                  tooltip="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
                >
                  <Radio.Group options={showStatus} />
                </Form.Item>
              </>
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
});
