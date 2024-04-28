import type React from 'react';

export default function Moon(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg
			{...props}
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			fillRule="evenodd"
		>
			<path
				fillRule="evenodd"
				d="M768 544H256a32 32 0 0 1-32-32 32 32 0 0 1 32-32h512a32 32 0 0 1 32 32 32 32 0 0 1-32 32z"
				p-id="44373"
			></path>
			<path d="M512 800a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32 32 32 0 0 1 32 32v512a32 32 0 0 1-32 32z"></path>
		</svg>
	);
}
