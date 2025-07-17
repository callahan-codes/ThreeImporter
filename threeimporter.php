<?php
/**
 * Plugin Name:       Three Importer
 * Description:       Import and render Three.js scenes via Block or Shortcode.
 * Version:           0.1.1
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Bryce Callahan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       threeimporter
 *
 * @package TiBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Register block
function ti_blocks_threeimporter_block_init() {
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}

	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'ti_blocks_threeimporter_block_init' );

// Register [scene] shortcode
function ti_shortcodes_threeimporter_shortcode_init( $atts, $content = null ) {
	$atts = shortcode_atts( array(
		'geometry' => 'box',
		'geometry_color' => '#000000',
		'geometry_material' => 'basic',
		'geometry_size' => '1',
		'geometry_xrotation' => '0',
		'geometry_yrotation' => '0',
		'geometry_zrotation' => '0',
		'geometry_instancing' => false,
		'geometry_instancingnum' => '50',
		'geometry_instancingspacing' => '1',
		'gltf_url' => '',
		'trid_text' => 'TI',
		'light' => 'ambient',
		'light_color' => '#FFFFFF',
		'light_intensity' => '1',
		'light_xpos' => '1',
		'light_ypos' => '1',
		'light_zpos' => '1',
		'light_helper' => false,
		'camera_xpos' => '5',
		'camera_ypos' => '0',
		'camera_zpos' => '0',
		'camera_xtarget' => '0',
		'camera_ytarget' => '0',
		'camera_ztarget' => '0',
		'camera_followmouse' => 'false',
		'scene_background' => 'none',
		'particle_amount' => '1000',
		'particle_size' => '1',
		'particle_speed' => '5',
		'particle_direction' => 'right',
		'particle_color' => '#000000',
		'particle_stretch' => '5',
		'cubegrid_stretch' => '120',
		'cubegrid_spacing' => '1',
		'cubegrid_material' => 'phong',
		'cubegrid_color' => '#FFFFFF',
		'trid_color' => '#FFFFFF',
		'trid_size' => '1',
	), $atts, 'scene' );

	$class_names = 'three-importer-container';

	return '<div class="' . esc_attr( $class_names ) . '" ' .
		'data-geometry-type="' . esc_attr( $atts['geometry'] ) . '" ' .
		'data-tridText-size="' . esc_attr( $atts['trid_size'] ) . '">' .
			'<div class="ti-content">' . do_shortcode( $content ) . '</div>' .
		'</div>';
}
add_shortcode( 'scene', 'ti_shortcodes_threeimporter_shortcode_init' );

// Register [sceneinject] shortcode
function threeimporter_sceneinject_shortcode() {
	// Enqueue the compiled sceneinject.js
	wp_enqueue_script(
		'three-sceneinject',
		plugin_dir_url(__FILE__) . 'build/threeimporter/sceneinject.js',
		array(), // No dependencies
		filemtime(plugin_dir_path(__FILE__) . 'build/threeimporter/sceneinject.js'),
		true
	);

	return '<!-- [sceneinject] loaded three.js -->';
}
add_shortcode( 'sceneinject', 'threeimporter_sceneinject_shortcode' );

// Conditionally enqueue scripts and styles
add_action( 'wp_enqueue_scripts', 'ti_enqueue_threejs_assets_if_needed' );
function ti_enqueue_threejs_assets_if_needed() {
	global $post;
	if ( ! isset( $post ) || ! $post instanceof WP_Post ) {
		return;
	}

	$content = $post->post_content;
	$has_block                 = has_block( 'threeimporter/scene', $post );
	$has_scene_shortcode       = has_shortcode( $content, 'scene' );

	if ( $has_block || $has_scene_shortcode ) {
		$index_asset_path = __DIR__ . '/build/threeimporter/index.asset.php';
		$index_asset = file_exists( $index_asset_path )
			? require $index_asset_path
			: array( 'dependencies' => array(), 'version' => '0.1.0' );

		wp_enqueue_script(
			'threeimporter',
			plugins_url( 'build/threeimporter/view.js', __FILE__ ),
			$index_asset['dependencies'],
			$index_asset['version'],
			true
		);

		wp_enqueue_style(
			'threeimporter-style',
			plugins_url( 'build/threeimporter/style-index.css', __FILE__ ),
			array(),
			'0.1.0'
		);
	}

}
