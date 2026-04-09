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

            const countBlocks = (blockList, targetName) => {
                let count = 0;
                blockList.forEach(block => {
                    if (block.name === targetName) count++;
                    if (block.innerBlocks && block.innerBlocks.length > 0) {
                        count += countBlocks(block.innerBlocks, targetName);
                    }
                });
                return count;
            };

            const tiBlockCount = countBlocks(blocks, 'ti-blocks/three-importer');
            
            const hasShortcode = content.includes('[ti3d_scene') || 
                                content.includes('[ti3d_sceneinject]');

            const hasConflict = (tiBlockCount > 1) || (tiBlockCount >= 1 && hasShortcode);

            if (hasConflict) {
                if (!isWarningDisplayed) {
                    isWarningDisplayed = true;
                    dispatch('core/notices').createNotice(
                        'error',
                        'Three Importer Conflict: Multiple scene methods detected. Please use only one (Block or Shortcode) to avoid rendering errors.',
                        { 
                            id: 'ti3d-conflict-notice',
                            isDismissible: true 
                        }
                    );
                }
            } else {
                if (isWarningDisplayed) {
                    isWarningDisplayed = false;
                    dispatch('core/notices').removeNotice('ti3d-conflict-notice');
                }
            }
        }

        const debouncedCheck = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(checkConsistency, 500);
        };

        subscribe(debouncedCheck);
        debouncedCheck();
    });
})(window.wp);