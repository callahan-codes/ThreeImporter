/**
 * 
 *  Script below written by Bryce Callahan
 *  Last Updated: 6/24/2025
 * 
 *  The following code registers the TI Block and sets
 * 	the edit and save functions for block editing and display.
 * 
*/

import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
} );
