import {
	Check,
	Element,
	Link,
	Monitor,
	Setting,
	Tool,
} from '~/components/svgIcon';

const menuIcons = new Map([
	[
		'system',
		<Setting key="system" className="size-[18px]" fill="currentColor" />,
	],
	[
		'monitor',
		<Monitor key="monitor" className="size-[18px]" fill="currentColor" />,
	],
	['tool', <Tool key="tool" className="size-[18px]" fill="currentColor" />],
	['guide', <Link key="guide" className="size-[18px]" fill="currentColor" />],
	[
		'element',
		<Element key="element" className="size-[18px]" fill="currentColor" />,
	],
	['check', <Check key="check" className="size-[18px]" fill="currentColor" />],
]);
export default menuIcons;
