<!-- 
/**
 * 
 *  Script below written by Bryce Callahan
 *  Last Updated: 6/25/2025
 * 
 *  The following code moves stylesheets to the 
 *  /build/threeimporter folder.
 * 
*/ 
-->

<?php

use function \WP_Block_Supports\render_block_core;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$style = '';

if ( ! empty( $attributes['style']['color']['background'] ) ) {
	$style .= 'background-color:' . esc_attr( $attributes['style']['color']['background'] ) . ';';
}

$wrapper_attributes = get_block_wrapper_attributes( array(
	'style' => $style,
	'class' => 'three-importer-container'
) );

?>

<div <?php echo $wrapper_attributes; ?>
	data-geometry-type="<?php echo esc_attr($attributes['geometry']);?>"	
	data-geometry-size="<?php echo esc_attr($attributes['geometry_size']);?>"
	data-geometry-material="<?php echo esc_attr($attributes['geometry_material']);?>"
	data-geometry-color="<?php echo esc_attr($attributes['geometry_color']);?>"
	data-geometry-xrotation="<?php echo esc_attr($attributes['geometry_xrotation']);?>"
	data-geometry-yrotation="<?php echo esc_attr($attributes['geometry_yrotation']);?>"
	data-geometry-zrotation="<?php echo esc_attr($attributes['geometry_zrotation']);?>"
	data-geometry-instancing="<?php echo $attributes['geometry_instancing'] ? 'true' : 'false'; ?>"
	data-geometry-instancingNum="<?php echo esc_attr($attributes['geometry_instancingnum']);?>"
	data-geometry-instancingSpacing="<?php echo esc_attr($attributes['geometry_instancingspacing']);?>"
	data-geometry-gltf="<?php echo esc_attr($attributes['gltf_url']);?>"
	data-geometry-tridText="<?php echo esc_attr($attributes['trid_text']);?>"
	data-light="<?php echo esc_attr($attributes['light']);?>"
	data-light-color="<?php echo esc_attr($attributes['light_color']);?>"
	data-light-intensity="<?php echo esc_attr($attributes['light_intensity']);?>"
	data-light-xpos="<?php echo esc_attr($attributes['light_xpos']);?>"
	data-light-ypos="<?php echo esc_attr($attributes['light_ypos']);?>"
	data-light-zpos="<?php echo esc_attr($attributes['light_zpos']);?>"
	data-light-helper="<?php echo $attributes['light_helper'] ? 'true' : 'false'; ?>"
	data-camera-xpos="<?php echo esc_attr($attributes['camera_xpos']);?>"
	data-camera-ypos="<?php echo esc_attr($attributes['camera_ypos']);?>"
	data-camera-zpos="<?php echo esc_attr($attributes['camera_zpos']);?>"
	data-camera-xtarget="<?php echo esc_attr($attributes['camera_xtarget']);?>"
	data-camera-ytarget="<?php echo esc_attr($attributes['camera_ytarget']);?>"
	data-camera-ztarget="<?php echo esc_attr($attributes['camera_ztarget']);?>"
	data-camera-followMouse="<?php echo $attributes['camera_followmouse'] ? 'true' : 'false'; ?>"
	data-scene-background="<?php echo esc_attr($attributes['scene_background']);?>"
	data-particle-amount="<?php echo esc_attr($attributes['particle_amount']);?>"
	data-particle-size="<?php echo esc_attr($attributes['particle_size']);?>"
	data-particle-speed="<?php echo esc_attr($attributes['particle_speed']);?>"
	data-particle-direction="<?php echo esc_attr($attributes['particle_direction']);?>"
	data-particle-color="<?php echo esc_attr($attributes['particle_color']);?>"
	data-particle-stretch="<?php echo esc_attr($attributes['particle_stretch']);?>"
	data-cubegrid-stretch="<?php echo esc_attr($attributes['cubegrid_stretch']);?>"
	data-cubegrid-spacing="<?php echo esc_attr($attributes['cubegrid_spacing']);?>"
	data-cubegrid-material="<?php echo esc_attr($attributes['cubegrid_material']);?>"
	data-cubegrid-color="<?php echo esc_attr($attributes['cubegrid_color']);?>"
	data-tridText-color="<?php echo esc_attr($attributes['trid_color']);?>"
	data-tridText-size="<?php echo esc_attr($attributes['trid_size']);?>">
	
	<div class="ti-content">
		<?php echo $content; ?>
	</div>

</div>
