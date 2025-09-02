import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

const customIcon = (
	<svg
		viewBox="0 0 226.77 226.77"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g
			transform="translate(8.964 4.2527)"
			fillRule="evenodd"
			stroke="#000"
			strokeLinecap="butt"
			strokeLinejoin="round"
			strokeWidth="4"
		>
			<path d="M63.02 200.61L19.807 25.67l173.23 49.874z" />
			<path d="M106.39 50.612l21.591 87.496-86.567-24.945z" />
			<path d="M84.91 125.03l-10.724-43.465 43.008 12.346z" />
			<path d="M63.458 38.153l10.724 43.465-43.008-12.346z" />
			<path d="M149.47 62.93l10.724 43.465-43.008-12.346z" />
			<path d="M84.915 125.06l10.724 43.465-43.008-12.346z" />
		</g>
	</svg>
);

registerBlockType(metadata.name, {
	...metadata,
	icon: customIcon,
	edit: Edit,
	save: Save,
});
