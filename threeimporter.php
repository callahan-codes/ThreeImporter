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
function mfp_display_threejs_geometry( $atts, $content = null ) {

	$atts = shortcode_atts( array(
		'geometry' => 'geo-type-box',
		'gltf_url' => '',
		'geometry_color' => 'geo-color-black',
		'geometry_size' => 1,
		'geometry_material' => 'geo-material-basic',
		'geometry_enableXRotation' => false,
		'geometry_enableYRotation' => false,
		'geometry_enableZRotation' => false,
		'geometry_enableInstancing' => false,
		'geometry_instancingNum' => 100,
		'geometry_instancingSpacing' => 40,
		'controls_enableCamRotation' => false,
		'rotation_speed' => 0,
		'scene_light' => 'scene-light-ambient',
		'scene_light_color' => 'scene-light-color-white',
		'camera_xposition' => 0,
		'camera_yposition' => 0,
		'camera_zposition' => 0,
		'textColor' => '',
		'backgroundColor' => '',
		'gradient' => ''
	), $atts, 'scene' );

	$bool_to_flag = function( $value ) {
		return ( $value && $value !== 'false' && $value !== '0' ) ? '1' : '0';
	};

	$class_names = 'three-importer-container';
	if ( ! empty( $atts['textColor'] ) ) {
		$class_names .= ' has-text-color has-' . sanitize_title( $atts['textColor'] ) . '-color';
	}
	if ( ! empty( $atts['backgroundColor'] ) ) {
		$class_names .= ' has-background has-' . sanitize_title( $atts['backgroundColor'] ) . '-background-color';
	}
	if ( ! empty( $atts['gradient'] ) ) {
		$class_names .= ' has-background has-' . sanitize_title( $atts['gradient'] ) . '-gradient-background';
	}

	$geometry_size      = floatval( $atts['geometry_size'] );
	$instancing_num     = intval( $atts['geometry_instancingNum'] );
	$instancing_spacing = floatval( $atts['geometry_instancingSpacing'] );
	$rotation_speed     = floatval( $atts['rotation_speed'] );
	$camera_x           = floatval( $atts['camera_xposition'] );
	$camera_y           = floatval( $atts['camera_yposition'] );
	$camera_z           = floatval( $atts['camera_zposition'] );

	return '<div class="' . esc_attr( $class_names ) . '" ' .
		'data-geometry-type="' . esc_attr( $atts['geometry'] ) . '" ' .
		'data-geometry-gltf="' . esc_url( $atts['gltf_url'] ) . '" ' .
		'data-geometry-color="' . esc_attr( $atts['geometry_color'] ) . '" ' .
		'data-geometry-size="' . esc_attr( $geometry_size ) . '" ' .
		'data-geometry-material="' . esc_attr( $atts['geometry_material'] ) . '" ' .
		'data-geometry-xrotate="' . $bool_to_flag( $atts['geometry_enableXRotation'] ) . '" ' .
		'data-geometry-yrotate="' . $bool_to_flag( $atts['geometry_enableYRotation'] ) . '" ' .
		'data-geometry-zrotate="' . $bool_to_flag( $atts['geometry_enableZRotation'] ) . '" ' .
		'data-geometry-instancing="' . $bool_to_flag( $atts['geometry_enableInstancing'] ) . '" ' .
		'data-geometry-instancingnum="' . esc_attr( $instancing_num ) . '" ' .
		'data-geometry-instancing-spacing="' . esc_attr( $instancing_spacing ) . '" ' .
		'data-controls-rotate="' . $bool_to_flag( $atts['controls_enableCamRotation'] ) . '" ' .
		'data-rotation-speed="' . esc_attr( $rotation_speed ) . '" ' .
		'data-scene-light="' . esc_attr( $atts['scene_light'] ) . '" ' .
		'data-scene-light-color="' . esc_attr( $atts['scene_light_color'] ) . '" ' .
		'data-camera-xposition="' . esc_attr( $camera_x ) . '" ' .
		'data-camera-yposition="' . esc_attr( $camera_y ) . '" ' .
		'data-camera-zposition="' . esc_attr( $camera_z ) . '">' .
			'<div class="ti-content">' . do_shortcode( $content ) . '</div>' .
		'</div>';
}
add_shortcode( 'scene', 'mfp_display_threejs_geometry' );

// Conditionally enqueue scripts and styles if block or shortcodes present
add_action( 'wp_enqueue_scripts', 'ti_enqueue_threejs_assets_if_needed' );
function ti_enqueue_threejs_assets_if_needed() {

	if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
		return;
	}

	global $post;
	if ( ! isset( $post ) || ! $post instanceof WP_Post ) {
		return;
	}

	$content = $post->post_content;
	$has_block                 = has_block( 'threeimporter/scene', $post );
	$has_scene_shortcode       = has_shortcode( $content, 'scene' );
	$has_customscene_shortcode = has_shortcode( $content, 'customscene' );

	if ( $has_block || $has_scene_shortcode || $has_customscene_shortcode ) {
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


function customScene_Shortcode() {

    // Enqueue the script
    wp_enqueue_script(
        'three-bundle-script',
        plugins_url( 'build/threeimporter/', __FILE__ ),
        array(), 
        '1.0.0',
        true // load in footer
    );
}
add_shortcode('customscene', 'customScene_Shortcode');

