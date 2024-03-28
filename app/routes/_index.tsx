import type { MetaFunction } from "@remix-run/node";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-red-600">Welcome to Remix (SPA Mode)</h1>
      <Button type="primary" icon={<PlusOutlined />}>
        按钮
      </Button>

      <ul>
        <li>
          <a target="_blank" href="https://remix.run/future/spa-mode" rel="noreferrer">
            SPA Mode Guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <Link to="/login">TO LOGIN</Link>
    </div>
  );
}
