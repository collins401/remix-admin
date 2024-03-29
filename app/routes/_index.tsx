import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "@remix-run/react";
import { styled } from "goober";
import bg from "~/assets/images/bg.svg";

const Welcome = styled("div")`
  position: relative;
  &:after {
    content: "";
    background-image: url(${bg});
    position: absolute;
    inset: 0px;
    z-index: 1;
    opacity: 0.5;
    background-position: right bottom;
    background-size: 100%;
    background-repeat: no-repeat;
  }
`;
export default function Index() {
  return (
    <div>
      <Welcome className="bg-primary p-10 rounded-lg text-white h-[250px]">
        <div className="relative z-[10]">
          <h2 className="text-3xl mb-6"> Explore Redesigned Able Pro</h2>
          <p className="text-base mb-8 text-white/85">
            The Brand new User Interface with power of Material-UI Components. Explore the Endless
            possibilities with Able Pro.
          </p>
          <Button type="default" ghost size="large">
            开始定制
          </Button>
        </div>
      </Welcome>
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