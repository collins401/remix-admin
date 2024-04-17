import { useNavigate } from '@remix-run/react'
import React from 'react'
import { clsx } from 'clsx'

interface IProps {
  title: string
  children?: React.ReactNode
  extra?: React.ReactNode
  className?: string
}
const PageTitle: React.FC<IProps> = props => {
  const { title, extra, children, className = '' } = props
  const go = useNavigate()

  return (
    <>
      <div className={clsx('flex-between space-x-3', className)}>
        <div className="flex items-center space-x-3">
          <span
            onClick={() => go(-1)}
            title="返回"
            style={{ fontSize: 0 }}
            className="inline-block transition-all size-[34px] align-middle hover:bg-black/30 dark:hover:bg-white/30 leading-[34px] text-center rounded-full cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 align-middle inline-block"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
              ></path>
            </svg>
          </span>
          <div className="text-base font-500">{title}</div>
        </div>
        {extra && <div className="space-x-3">{extra}</div>}
      </div>
      {children}
    </>
  )
}

export default PageTitle
