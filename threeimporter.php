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

// direct access - exit
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// register block
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

// register [scene] shortcode
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

	// Start building the div
	$output = '<div class="' . esc_attr( $class_names ) . '"';

	// Append each attribute as data-*
	$output .= ' data-geometry-type="' . esc_attr( $atts['geometry'] ) . '"';
	$output .= ' data-geometry-size="' . esc_attr( $atts['geometry_size'] ) . '"';
	$output .= ' data-geometry-material="' . esc_attr( $atts['geometry_material'] ) . '"';
	$output .= ' data-geometry-color="' . esc_attr( $atts['geometry_color'] ) . '"';
	$output .= ' data-geometry-xrotation="' . esc_attr( $atts['geometry_xrotation'] ) . '"';
	$output .= ' data-geometry-yrotation="' . esc_attr( $atts['geometry_yrotation'] ) . '"';
	$output .= ' data-geometry-zrotation="' . esc_attr( $atts['geometry_zrotation'] ) . '"';
	$output .= ' data-geometry-instancing="' . ( $atts['geometry_instancing'] ? 'true' : 'false' ) . '"';
	$output .= ' data-geometry-instancingNum="' . esc_attr( $atts['geometry_instancingnum'] ) . '"';
	$output .= ' data-geometry-instancingSpacing="' . esc_attr( $atts['geometry_instancingspacing'] ) . '"';
	$output .= ' data-geometry-gltf="' . esc_attr( $atts['gltf_url'] ) . '"';
	$output .= ' data-geometry-tridText="' . esc_attr( $atts['trid_text'] ) . '"';
	$output .= ' data-light="' . esc_attr( $atts['light'] ) . '"';
	$output .= ' data-light-color="' . esc_attr( $atts['light_color'] ) . '"';
	$output .= ' data-light-intensity="' . esc_attr( $atts['light_intensity'] ) . '"';
	$output .= ' data-light-xpos="' . esc_attr( $atts['light_xpos'] ) . '"';
	$output .= ' data-light-ypos="' . esc_attr( $atts['light_ypos'] ) . '"';
	$output .= ' data-light-zpos="' . esc_attr( $atts['light_zpos'] ) . '"';
	$output .= ' data-light-helper="' . ( $atts['light_helper'] ? 'true' : 'false' ) . '"';
	$output .= ' data-camera-xpos="' . esc_attr( $atts['camera_xpos'] ) . '"';
	$output .= ' data-camera-ypos="' . esc_attr( $atts['camera_ypos'] ) . '"';
	$output .= ' data-camera-zpos="' . esc_attr( $atts['camera_zpos'] ) . '"';
	$output .= ' data-camera-xtarget="' . esc_attr( $atts['camera_xtarget'] ) . '"';
	$output .= ' data-camera-ytarget="' . esc_attr( $atts['camera_ytarget'] ) . '"';
	$output .= ' data-camera-ztarget="' . esc_attr( $atts['camera_ztarget'] ) . '"';
	$output .= ' data-camera-followMouse="' . ( $atts['camera_followmouse'] === 'true' ? 'true' : 'false' ) . '"';
	$output .= ' data-scene-background="' . esc_attr( $atts['scene_background'] ) . '"';
	$output .= ' data-particle-amount="' . esc_attr( $atts['particle_amount'] ) . '"';
	$output .= ' data-particle-size="' . esc_attr( $atts['particle_size'] ) . '"';
	$output .= ' data-particle-speed="' . esc_attr( $atts['particle_speed'] ) . '"';
	$output .= ' data-particle-direction="' . esc_attr( $atts['particle_direction'] ) . '"';
	$output .= ' data-particle-color="' . esc_attr( $atts['particle_color'] ) . '"';
	$output .= ' data-particle-stretch="' . esc_attr( $atts['particle_stretch'] ) . '"';
	$output .= ' data-cubegrid-stretch="' . esc_attr( $atts['cubegrid_stretch'] ) . '"';
	$output .= ' data-cubegrid-spacing="' . esc_attr( $atts['cubegrid_spacing'] ) . '"';
	$output .= ' data-cubegrid-material="' . esc_attr( $atts['cubegrid_material'] ) . '"';
	$output .= ' data-cubegrid-color="' . esc_attr( $atts['cubegrid_color'] ) . '"';
	$output .= ' data-tridText-color="' . esc_attr( $atts['trid_color'] ) . '"';
	$output .= ' data-tridText-size="' . esc_attr( $atts['trid_size'] ) . '"';

	// Close the opening div
	$output .= '>';

	// Add inner content
	$output .= '<div class="ti-content">' . do_shortcode( $content ) . '</div>';

	// Close the outer div
	$output .= '</div>';

	return $output;
}
add_shortcode( 'scene', 'ti_shortcodes_threeimporter_shortcode_init' );

// register [sceneinject] shortcode
function threeimporter_sceneinject_shortcode() {
	// Enqueue the compiled sceneinject.js
	wp_enqueue_script(
		'three-sceneinject',
		plugin_dir_url(__FILE__) . 'build/threeimporter/sceneinject.js',
		array(), // No dependencies
		filemtime(plugin_dir_path(__FILE__) . 'build/threeimporter/sceneinject.js'),
		true
	);

	// enqueue css for three-importer-container
	wp_enqueue_style(
		'three-importer-style',
		plugin_dir_url(__FILE__) . 'build/threeimporter/style-index.css',
		array(), // No dependencies
		filemtime(plugin_dir_path(__FILE__) . 'build/threeimporter/style-index.css')
	);

	return '<!-- [sceneinject] loaded three.js -->';
}
add_shortcode( 'sceneinject', 'threeimporter_sceneinject_shortcode' );

// conditionally enqueue scripts and styles for block/shortcode
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
