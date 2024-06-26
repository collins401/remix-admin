import { CodeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd/es/menu/index";
import { styled } from "goober";
import { useAtom } from "jotai";
import { isEmpty } from "lodash-es";
import type React from "react";
import { useLayoutEffect, useState } from "react";
import menuIcons from "./menuIcons";

import { authMenuAtom } from "~/atoms/user";
import { SITE_TITLE } from "~/lib/config";

type MenuItem = Required<MenuProps>["items"][number];

const MenuStyle = styled(Menu)`
  .ant-menu-submenu .ant-menu-item.ant-menu-item-selected {
    /* background: none; */
  }
  &.ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: none;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item {
    position: relative;
    overflow: inherit;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item:before {
    width: 4px;
    height: 4px !important;
    border-radius: 100%;
    background: gray;
    content: "";
    left: 38px;
    top: 18px;
    position: absolute;
  }
  .ant-menu-submenu-title .ant-menu-item-icon + span,
  .ant-menu-item .ant-menu-item-icon + span {
    margin-inline-start: 4px;
  }
  .ant-menu-sub.ant-menu-inline .ant-menu-item-selected.ant-menu-item:before {
    background: ${(props) => props.theme.primary};
  }
`;

interface IProps {
  collapsed: boolean;
  onChange: (collapsed: boolean) => void;
}
const SiderBar: React.FC<IProps> = (props) => {
  const { collapsed, onChange } = props;
  const [authMenu] = useAtom(authMenuAtom);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  function flatRoute(menus: any, index = 0, parentPath = "") {
    const newArray: MenuItem[] = [];
    // biome-ignore lint/complexity/noForEach: <explanation>
    menus?.forEach((item: any) => {
      const icons = index === 0 ? menuIcons.get(item.meta?.icon) ?? <CodeOutlined /> : null;
      const path = parentPath + item.path;
      if (!isEmpty(item.children)) {
        const child = flatRoute(item.children, index + 1, `${path}/`);
        if (!item.hidden && item.meta?.title !== "日志管理") {
          return newArray.push({
            icon: icons,
            key: path,
            label: item.meta?.title,
            children: child,
          });
        }
      }
      if (!item.hidden) {
        return newArray.push({
          icon: icons,
          key: path,
          label: (
            <Link
              to={path}
              prefetch="intent"
              className="text-color block"
              target={path.startsWith("http") ? "_blank" : ""}
              rel="noreferrer"
            >
              {item.meta.title}
            </Link>
          ),
        });
      }
    });
    return newArray;
  }

  function findTreeNodeById(tree: any[], id: string, path = ""): any {
    let result = null;
    for (let i = 0; i < tree.length; i++) {
      const item = tree[i];
      const newPath = path ? `${path}/${item.path}` : item.path;
      if (newPath === id) {
        return item;
      }
      if (!isEmpty(item.children)) {
        result = findTreeNodeById(item.children, id, newPath);
        if (result) {
          return result;
        }
      }
    }
    return result;
  }

  useLayoutEffect(() => {
    const keys = pathname.split("/");
    let newPathname = pathname;
    let selectedPath = findTreeNodeById(authMenu, pathname);
    if (!selectedPath && keys.length > 2) {
      keys.splice(keys.length - 1);
      newPathname = keys.join("/");
      selectedPath = findTreeNodeById(authMenu, newPathname);
    }
    if (selectedPath) {
      setSelectedKeys([newPathname]);
      const openArr = pathname.split("/");
      if (openArr.length > 3) {
        openArr.splice(openArr.length - 1);
        setOpenKeys([`/${openArr[1]}`, openArr.join("/")]);
      } else {
        setOpenKeys([`/${openArr[1]}`]);
      }
    }
  }, [pathname]);

  function LinkToPage(e: any) {
    if (e.key.startsWith("http")) {
      window.open(e.key);
    }
  }
  function openChange(e) {
    if (e.length === 2 && !e[1].includes(e[0])) {
      setOpenKeys([e[1]]);
    } else {
      setOpenKeys(e);
    }
  }

  return (
    <>
      <Layout.Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        className="!fixed bottom-0 top-0"
        theme="light"
        width={230}
        onChange={() => onChange(!collapsed)}
      >
        <div className="flex items-center pl-4 h-[64px] border-b">
          <Link to="/" className="flex-center">
            <img src="/React.png" alt="" className="h-[64px]" />
          </Link>
        </div>
        <div className="overflow-auto max-h-[calc(100vh-120px)]">
          <MenuStyle
            mode="inline"
            items={flatRoute(authMenu)}
            onClick={LinkToPage}
            onOpenChange={openChange}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
          />
        </div>
        <div className="border-t absolute bottom-0 w-full left-0 px-3 py-2">
          <span
            onClick={() => onChange(!collapsed)}
            className="inline-block cursor-pointer hover:opacity-80 rounded bg-slate-200 dark:bg-white/20 px-2 h-[28px] leading-[28px]"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
      </Layout.Sider>
      <div className={collapsed ? "w-[80px] transition-all" : "w-[230px] transition-all"} />
    </>
  );
};
export default SiderBar;
