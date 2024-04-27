import 'dayjs/locale/zh-cn'
import { App, ConfigProvider, theme, ThemeConfig } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import { useAtomValue } from 'jotai'

import { darkModeAtom } from '~/atoms/app'
import { COLOR_PRIMARY } from '~/lib/config'

export const themeConfig: ThemeConfig = {
  // 主题配置
  components: {
    // 组件配置
    Table: {
      colorLink: COLOR_PRIMARY
    },
    Menu: {
      // itemBg: '#fff',
      // itemSelectedBg: 'rgba(11,96,176,.2)',
      // darkItemBg: '#141414',
      // itemMarginBlock: 0,
      itemBorderRadius: 0,
      itemMarginInline: 0
    },
    Layout: {
      siderBg: '#fff'
      // lightSiderBg: '#000'
    }
  },
  token: {
    colorPrimary: COLOR_PRIMARY,
    colorLink: COLOR_PRIMARY
    // colorText: 'rgba(0, 0, 0, 0.85)'
  }
}
interface ThemeProviderProps {
  children: React.ReactNode
}
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const darkModes = useAtomValue(darkModeAtom)
  function toggleColor(): any {
    if (darkModes === 'dark') {
      return {
        '--border-color': '#424242',
        '--bg-white': '20 20 20',
        '--text-color': '255 255 255'
      }
    } else {
      return {
        '--border-color': '#d9d9d9',
        '--bg-white': '255 255 255',
        '--text-color': '0 0 0'
      }
    }
  }
  return (
    <ConfigProvider
      locale={zh_CN}
      input={{ autoComplete: 'off' }}
      theme={{
        algorithm: darkModes === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ...themeConfig
      }}
    >
      <App style={toggleColor()}>{children}</App>
    </ConfigProvider>
  )
}
