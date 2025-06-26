<?php
/**
 * Plugin Name:       Three Importer
 * Description:       Import and render Three.js scenes via Block or Shortcode.
 * Version:           0.1.1
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
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
		'geometry_instancingNum' => '50',
		'geometry_instancingSpacing' => '1',
		'gltf_url' => '',
		'light' => 'ambient',
		'light_color' => '#FFFFFF',
		'light_intensity' => '1',
		'light_xpos' => '1',
		'light_ypos' => '1',
		'light_zpos' => '1',
		'camera_xpos' => '5',
		'camera_ypos' => '0',
		'camera_zpos' => '0',
		'background' => 'none',
		'particle_amount' => '1000',
		'particle_size' => '1',
		'particle_speed' => '5',
		'particle_direction' => 'right',
		'particle_color' => '#000000',
		'particle_stretch' => '5',

	), $atts, 'scene' );

	$class_names = 'three-importer-container';

	return '<div class="' . esc_attr( $class_names ) . '" ' .
		'data-geometry-type="' . esc_attr( $atts['geometry'] ) . '" ' .
		'data-geometry-size="' . esc_attr( $atts['geometry_size'] ) . '" ' .
		'data-geometry-material="' . esc_attr( $atts['geometry_material'] ) . '" ' .
		'data-geometry-color="' . esc_attr( $atts['geometry_color'] ) . '" ' .
		'data-geometry-xrotation="' . esc_attr( $atts['geometry_xrotation'] ) . '" ' .
		'data-geometry-yrotation="' . esc_attr( $atts['geometry_yrotation'] ) . '" ' .
		'data-geometry-zrotation="' . esc_attr( $atts['geometry_zrotation'] ) . '" ' .
		'data-geometry-instancing="' . ( $atts['geometry_instancing'] ? 'true' : 'false' ) . '" ' .
		'data-geometry-instancingNum="' . esc_attr( $atts['geometry_instancingNum'] ) . '" ' .
		'data-geometry-instancingSpacing="' . esc_attr( $atts['geometry_instancingSpacing'] ) . '" ' .
		'data-geometry-gltf="' . esc_attr( $atts['gltf_url'] ) . '" ' .
		'data-light="' . esc_attr( $atts['light'] ) . '" ' .
		'data-light-color="' . esc_attr( $atts['light_color'] ) . '" ' .
		'data-light-intensity="' . esc_attr( $atts['light_intensity'] ) . '" ' .
		'data-light-xpos="' . esc_attr( $atts['light_xpos'] ) . '" ' .
		'data-light-ypos="' . esc_attr( $atts['light_ypos'] ) . '" ' .
		'data-light-zpos="' . esc_attr( $atts['light_zpos'] ) . '" ' .
		'data-camera-xpos="' . esc_attr( $atts['camera_xpos'] ) . '" ' .
		'data-camera-ypos="' . esc_attr( $atts['camera_ypos'] ) . '" ' .
		'data-camera-zpos="' . esc_attr( $atts['camera_zpos'] ) . '" ' .
		'data-scene-background="' . esc_attr( $atts['scene_background'] ) . '" ' .
		'data-particle-amount="' . esc_attr( $atts['particle_amount'] ) . '" ' .
		'data-particle-size="' . esc_attr( $atts['particle_size'] ) . '" ' .
		'data-particle-speed="' . esc_attr( $atts['particle_speed'] ) . '" ' .
		'data-particle-direction="' . esc_attr( $atts['particle_direction'] ) . '" ' .
		'data-particle-color="' . esc_attr( $atts['particle_color'] ) . '" ' .
		'data-particle-stretch="' . esc_attr( $atts['particle_stretch'] ) . '">' .

			'<div class="ti-content">' . do_shortcode( $content ) . '</div>' .
		'</div>';
}
add_shortcode( 'scene', 'ti_shortcodes_threeimporter_shortcode_init' );

// Conditionally enqueue scripts and styles if block or shortcodes present
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
