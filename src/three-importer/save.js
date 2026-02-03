import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        inner_alignment, 
        inner_vertical_alignment, 
        block_height 
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'ti-content',
        style: { 
            minHeight: block_height || '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 
                inner_vertical_alignment === 'bottom' ? 'flex-end' : 
                inner_vertical_alignment === 'center' ? 'center' : 'flex-start',
            alignItems: 
                inner_alignment === 'right' ? 'flex-end' : 
                inner_alignment === 'center' ? 'center' : 'stretch'
        }
    });

    return (
        <div {...blockProps}>
            <div style={{ pointerEvents: 'auto', width: '100%' }}>
                <InnerBlocks.Content /> 
            </div>
        </div>
    );
}