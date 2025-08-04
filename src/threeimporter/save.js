import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { block_height } = attributes;

	return (
		<div className="ti-adjustable" style={{ height: block_height }}>
			<InnerBlocks.Content />
		</div>
	);
}