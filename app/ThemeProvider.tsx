import { ConfigProvider, ThemeConfig, theme, App } from "antd";
import zh_CN from "antd/lib/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { useAtomValue } from "jotai";
import { darkModeAtom } from "~/atoms/app";
import { COLOR_PRIMARY } from "~/lib/config";

export const themeConfig: ThemeConfig = {
  // 主题配置
  components: {
    // 组件配置
    Table: {
      colorLink: COLOR_PRIMARY,
    },
    Menu: {
      itemBg: "#fff",
      itemSelectedBg: "rgba(11,96,176,.2)",
      darkItemBg: "#000000",
    },
    Layout: {
      siderBg: "#ededed",
    },
  },
  token: {
    colorPrimary: COLOR_PRIMARY,
    colorLink: COLOR_PRIMARY,
  },
};
interface ThemeProviderProps {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const darkModes = useAtomValue(darkModeAtom);
  return (
    <ConfigProvider
      locale={zh_CN}
      theme={{
        algorithm: darkModes ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ...themeConfig,
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}