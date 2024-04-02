import React from 'react'
import { Button } from 'antd'
import Catch from './boundary'

import ERROR_IMG from '~/assets/images/error.svg'

/**
 * 包裹组件，在渲染错误的时候显示
 * <ErrorBoundary>
 *    <RError />
 * </ErrorBoundary>
 */
interface Props {
  children: React.ReactNode
}
const systemUpdateFlag = 'Failed to fetch dynamically'
const ErrorBoundary = Catch((props: Props, error?: Error) => {
  if (error) {
    return (
      <div className="container mx-auto border border-[#ffccc7] dark:border-[#5b2526] p-5 bg-[#fff2f0] dark:bg-[#2c1618] rounded-lg">
        <div className="lg:flex  items-center">
          <div className="flex-1">
            {error.message.includes(systemUpdateFlag) ? (
              <>
                <h2 className="text-primary text-2xl mb-7 font-500 ">系统更新了</h2>
                <p className="text-color/60 mb-0">很抱歉，中断了您当前的操作！</p>
                <p className="text-color/60 mb-2">为了更好的使用系统新功能，请手动刷新页面</p>
                <Button
                  onClick={() => {
                    // 清除相关缓存
                    // sessionStorage.clear()
                    // localStorage.clear()
                    location.reload()
                  }}
                  type="primary"
                >
                  立即更新
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-primary text-2xl mb-4 font-500 ">页面出错了</h2>
                <p className="mb-0 text-color/60 mb-4">
                  很抱歉，中断了您当前的操作, 你可以 <br />
                  <a
                    className="hover:!underline font-500"
                    onClick={() => window.location.replace(document.referrer)}
                  >
                    返回上一页
                  </a>
                  <span className="mx-1">或</span>
                  <a className="hover:!underline font-500" onClick={() => location.reload()}>
                    刷新当前页
                  </a>
                </p>
                <p className="text-16px">
                  <div className="text-12px text-color/60">错误信息</div>
                  <div className="text-12px text-color/30">{error.message}</div>
                </p>
              </>
            )}
          </div>
          <div className="flex-1 hidden lg:(text-right block max-w-320px)">
            <img alt="error" src={ERROR_IMG} />
          </div>
        </div>
      </div>
    )
  }
  return props.children
})

export default ErrorBoundary
