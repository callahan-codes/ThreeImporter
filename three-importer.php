<?php
/**
 * Plugin Name:       Three Importer
 * Description:       Create custom Three.js scenes via Block, Shortcode, or your own script.
 * Version:           1.0.3
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Bryce Callahan
 * Author URI:        https://www.brycecallahan.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       three-importer
 *
 * @package TiBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * 1. REGISTER THE BLOCK
 */
function ti3d_block_init() {
    if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
        wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
        return;
    }

    $manifest_data = require __DIR__ . '/build/blocks-manifest.php';
    foreach ( array_keys( $manifest_data ) as $block_type ) {
        register_block_type( __DIR__ . "/build/{$block_type}" );
    }
}
add_action( 'init', 'ti3d_block_init' );

/**
 * 2. AUTOMATED SCENE SHORTCODE [ti3d_scene]
 */
function ti3d_shortcodes_scene_init( $atts, $content = null ) {
    // DENY LOGIC: If Manual mode is active OR a Block already ran, kill the shortcode logic.
    if ( defined( 'TI3D_MODE_MANUAL' ) || defined( 'TI3D_MODE_BLOCK_ACTIVE' ) ) {
        return '';
    }

    // LOCK MODE: Automated (Shortcode version)
    if ( ! defined( 'TI3D_MODE_AUTOMATED' ) ) {
        define( 'TI3D_MODE_AUTOMATED', true );
    }

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
        'light_color' => '#ffffff',
        'light_intensity' => '1',
        'light_xpos' => '0',
        'light_ypos' => '0',
        'light_zpos' => '0',
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
        'cubegrid_color' => '#ffffff',
        'trid_color' => '#ffffff',
        'trid_size' => '1',
    ), $atts, 'ti3d_scene' );

    $class_names = 'three-importer-container';
    $output = '<div class="' . esc_attr( $class_names ) . '"';
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
    $output .= '>';
    $output .= '<div class="ti-content">' . do_shortcode( $content ) . '</div>';
    $output .= '</div>';

    return $output;
}
add_shortcode( 'ti3d_scene', 'ti3d_shortcodes_scene_init' );

/**
 * 3. MANUAL INJECTION SHORTCODE [ti3d_sceneinject]
 */
function ti3d_shortcodes_sceneinject_init($atts = []) {
    // DENY LOGIC: If automated mode is already active (Block or ti3d_scene), abort.
    if ( defined( 'TI3D_MODE_AUTOMATED' ) || defined( 'TI3D_MODE_BLOCK_ACTIVE' ) ) {
        return '';
    }

    // LOCK MODE: Manual
    if ( ! defined( 'TI3D_MODE_MANUAL' ) ) {
        define( 'TI3D_MODE_MANUAL', true );
    }

    $allowed_modules = [
        'orbitcontrols', 'flycontrols', 'firstpersoncontrols', 'pointerlockcontrols', 'trackballcontrols',
        'gltfloader', 'objloader', 'fbxloader', 'textureloader', 'cubetextureloader',
        'dracoloader', 'rgbeloader',
        'effectcomposer', 'renderpass', 'unrealbloompass', 'shaderpass', 'ssaopass',
        'fxaashader', 'copyshader', 'luminosityshader', 'sobeloperatorshader',
        'boxlinegeometry', 'convexgeometry', 'parametricgeometry', 'teapotgeometry',
        'gridhelper', 'axeshelper', 'camerahelper', 'directionallighthelper',
        'animationmixer', 'stats', 'gui'
    ];

    $requested_modules = [];
    if ( is_array( $atts ) ) {
        foreach ( $atts as $key => $value ) {
            $key_low   = strtolower( (string) $key );
            $value_low = strtolower( (string) $value );
            if ( in_array( $key_low, $allowed_modules ) ) $requested_modules[] = $key_low;
            elseif ( in_array( $value_low, $allowed_modules ) ) $requested_modules[] = $value_low;
        }
    }
    $requested_modules = array_unique( $requested_modules );

    wp_enqueue_script(
        'three-sceneinject',
        plugin_dir_url(__FILE__) . 'build/three-importer/sceneinject.js',
        [], 
        filemtime(plugin_dir_path(__FILE__) . 'build/three-importer/sceneinject.js'),
        true
    );

    $json_modules = wp_json_encode( array_values( $requested_modules ) );
    wp_add_inline_script(
        'three-sceneinject',
        'window.sceneinject_modules = window.sceneinject_modules || []; 
         window.sceneinject_modules = window.sceneinject_modules.concat(' . $json_modules . ');',
        'before'
    );

    return '';
}
add_shortcode('ti3d_sceneinject', 'ti3d_shortcodes_sceneinject_init');

/**
 * 4. CONDITIONAL ASSET ENQUEUING
 */
function ti3d_enqueue_assets() {
    global $post;
    if ( ! is_singular() || ! is_a( $post, 'WP_Post' ) ) return;

    $content = $post->post_content;
    $has_block = has_block( 'ti-blocks/three-importer', $content ); 
    $has_scene_shortcode = has_shortcode( $content, 'ti3d_scene' ); 
    $has_inject_shortcode = has_shortcode( $content, 'ti3d_sceneinject' );
    
    // Check if a shortcode claimed the page before the block logic runs
    if ( $has_block && ( defined('TI3D_MODE_MANUAL') || defined('TI3D_MODE_AUTOMATED') ) ) {
        // We do not load view.js because a shortcode is already taking priority
        return;
    }

    if ( ( $has_block || $has_scene_shortcode ) && ! defined( 'TI3D_MODE_MANUAL' ) ) {
        
        // Lock that a block-style logic is active to prevent shortcodes from rendering later
        if (!defined('TI3D_MODE_BLOCK_ACTIVE')) define('TI3D_MODE_BLOCK_ACTIVE', true);

        $index_asset_path = __DIR__ . '/build/three-importer/index.asset.php';
        $index_asset = file_exists( $index_asset_path )
            ? require $index_asset_path
            : array( 'dependencies' => array(), 'version' => '0.1.0' );

        wp_enqueue_script(
            'threeimporter', 
            plugins_url( 'build/three-importer/view.js', __FILE__ ),
            $index_asset['dependencies'],
            $index_asset['version'],
            true
        );

        wp_localize_script(
            'threeimporter', 
            'threeImporterData', 
            array(
                'fontUrl' => plugin_dir_url( __FILE__ ) . 'public/Open_Sans_Condensed_Bold.json',
            )
        );
    }

    if ( $has_block || $has_scene_shortcode || $has_inject_shortcode ) {
        wp_enqueue_style(
            'threeimporter-style',
            plugins_url( 'build/three-importer/style-index.css', __FILE__ ),
            array(),
            '0.1.0'
        );
    }
}
add_action( 'wp_enqueue_scripts', 'ti3d_enqueue_assets' );

/**
 * 5. EDITOR WARNING ENQUEUE
 */
function ti3d_enqueue_editor_warnings() {
    $file_path = plugin_dir_path(__FILE__) . 'build/three-importer/warning.js';
    
    if ( file_exists( $file_path ) ) {
        wp_enqueue_script(
            'ti3d-editor-warnings',
            plugin_dir_url(__FILE__) . 'build/three-importer/warning.js',
            array('wp-data', 'wp-editor', 'wp-notices', 'wp-core-data', 'wp-dom-ready'),
            filemtime( $file_path ),
            true
        );
    }
}
add_action('enqueue_block_editor_assets', 'ti3d_enqueue_editor_warnings');