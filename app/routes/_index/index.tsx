import { styled } from 'goober';

import bg from '~/assets/images/bg.svg';

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
`;
export default function Index() {
	return (
		<div>
			<Welcome className="bg-primary p-10 rounded-lg text-white h-[250px]">
				<div className="relative z-[10]">
					<h2 className="text-3xl mb-6">
						Remix-Admin
						<span className="text-xl text-white/60">
							(SPA Mode base Ruoyi api style)
						</span>
					</h2>
					<p className="text-base text-white/80">
						Basic tech: Ant Design5.x + Tailwindcss + Jotai
					</p>
					<p className="text-base text-white/80 mb-8">
						Other plugin: remix-flat-routes,ofetch,ahooks,goober
					</p>
					<span className="inline-block py-2 px-6 border border-white rounded-full text-xl cursor-pointer hover:opacity-45">
						Get Started
					</span>
				</div>
			</Welcome>
		</div>
	);
}
