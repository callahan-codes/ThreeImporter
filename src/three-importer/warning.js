(function(wp) {
    wp.domReady(() => {
        const { subscribe, select, dispatch } = wp.data;
        
        // This variable persists outside the subscription loop
        let isWarningDisplayed = false;
        let timeoutId = null;

        function checkConsistency() {
            const blockEditor = select('core/block-editor');
            const editor = select('core/editor');
            
            if (!blockEditor || !editor) return;

            const blocks = blockEditor.getBlocks();
            const content = editor.getEditedPostContent() || '';

            // Check for TI Block
            const hasTiBlock = (blockList) => {
                return blockList.some(block => 
                    block.name === 'ti-blocks/three-importer' || 
                    (block.innerBlocks && hasTiBlock(block.innerBlocks))
                );
            };

            // Check for shortcodes in blocks
            const hasShortcodeInBlocks = (blockList, target) => {
                return blockList.some(block => {
                    const text = block.attributes.text || '';
                    return text.includes(target) || (block.innerBlocks && hasShortcodeInBlocks(block.innerBlocks, target));
                });
            };

            const blockExists = hasTiBlock(blocks);
            const automatedShortcodeExists = content.includes('[ti3d_scene ') || hasShortcodeInBlocks(blocks, '[ti3d_scene ');
            const manualShortcodeExists = content.includes('[ti3d_sceneinject]') || hasShortcodeInBlocks(blocks, '[ti3d_sceneinject]');

            // The conflict condition
            const hasConflict = (blockExists && (automatedShortcodeExists || manualShortcodeExists)) || 
                               (automatedShortcodeExists && manualShortcodeExists);

            if (hasConflict) {
                // IMPORTANT: Only dispatch if we haven't already flagged it
                if (!isWarningDisplayed) {
                    isWarningDisplayed = true; // LOCK immediately
                    
                    dispatch('core/notices').createNotice(
                        'error',
                        'Three Importer Conflict: Multiple scene methods detected. Please use only one (Block or Shortcode) to avoid errors.',
                        { 
                            id: 'ti3d-conflict-notice', // Fixed ID prevents duplicates
                            isDismissible: true 
                        }
                    );
                }
            } else {
                if (isWarningDisplayed) {
                    isWarningDisplayed = false; // UNLOCK
                    dispatch('core/notices').removeNotice('ti3d-conflict-notice');
                }
            }
        }

        // Debounce to stop the "flood"
        const debouncedCheck = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(checkConsistency, 500);
        };

        // Listen for changes
        subscribe(debouncedCheck);
        
        // Run once on load
        debouncedCheck();
    });
})(window.wp);