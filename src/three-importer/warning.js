(function(wp) {
    wp.domReady(() => {
        const { subscribe, select, dispatch } = wp.data;
        let isWarningDisplayed = false;
        let timeoutId = null;

        function checkConsistency() {
            const blockEditor = select('core/block-editor');
            const editor = select('core/editor');
            
            if (!blockEditor || !editor) return;

            const blocks = blockEditor.getBlocks();
            const content = editor.getEditedPostContent() || '';

            // check for TI Block
            const hasTiBlock = (blockList) => {
                return blockList.some(block => 
                    block.name === 'ti-blocks/three-importer' || 
                    (block.innerBlocks && hasTiBlock(block.innerBlocks))
                );
            };

            // check for shortcodes in blocks
            const hasShortcodeInBlocks = (blockList, target) => {
                return blockList.some(block => {
                    const text = block.attributes.text || '';
                    return text.includes(target) || (block.innerBlocks && hasShortcodeInBlocks(block.innerBlocks, target));
                });
            };

            const blockExists = hasTiBlock(blocks);
            const automatedShortcodeExists = content.includes('[ti3d_scene ') || hasShortcodeInBlocks(blocks, '[ti3d_scene ');
            const manualShortcodeExists = content.includes('[ti3d_sceneinject]') || hasShortcodeInBlocks(blocks, '[ti3d_sceneinject]');

            // the conflict condition
            const hasConflict = (blockExists && (automatedShortcodeExists || manualShortcodeExists)) || 
                               (automatedShortcodeExists && manualShortcodeExists);

            if (hasConflict) {
                // dispatch if flagged
                if (!isWarningDisplayed) {
                    isWarningDisplayed = true; // lock
                    
                    dispatch('core/notices').createNotice(
                        'error',
                        'Three Importer Conflict: Multiple scene methods detected. Please use only one (Block or Shortcode) to avoid errors.',
                        { 
                            id: 'ti3d-conflict-notice',
                            isDismissible: true 
                        }
                    );
                }
            } else {
                if (isWarningDisplayed) {
                    isWarningDisplayed = false; // unlock
                    dispatch('core/notices').removeNotice('ti3d-conflict-notice');
                }
            }
        }

        // debounce to stop the "flood"
        const debouncedCheck = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(checkConsistency, 500);
        };

        subscribe(debouncedCheck);
        debouncedCheck();
    });
})(window.wp);