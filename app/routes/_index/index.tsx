import { styled } from 'goober'

import bg from '~/assets/images/bg.svg'

const Welcome = styled('div')`
  position: relative;
  &:after {
    content: '';
    background-image: url(${bg});
    position: absolute;
    inset: 0px;
    z-index: 1;
    opacity: 0.5;
    background-position: right bottom;
    background-size: 100%;
    background-repeat: no-repeat;
  }
`
export default function Index() {
  return (
    <div>
      <Welcome className="bg-primary p-10 rounded-lg text-white h-[250px]">
        <div className="relative z-[10]">
          <h2 className="text-3xl mb-6"> Remix Admin base Ruoyi api</h2>
          <p className="text-base mb-8 text-white/85">Ant-design + Jotai + Tailwindcss</p>
          <span className="inline-block py-2 px-6 border border-white rounded-full">开始定制</span>
        </div>
      </Welcome>
    </div>
  )
}
