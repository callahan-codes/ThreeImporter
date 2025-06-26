<?php

use function \WP_Block_Supports\render_block_core;

// exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$class_names = 'three-importer-container';
?>

<div 
	class="<?php echo esc_attr( $class_names ); ?>"
	data-geometry-type="<?php echo esc_attr($attributes['geometry']);?>"	
	data-geometry-size="<?php echo esc_attr($attributes['geometry_size']);?>"
	data-geometry-material="<?php echo esc_attr($attributes['geometry_material']);?>"
	data-geometry-color="<?php echo esc_attr($attributes['geometry_color']);?>"
	data-geometry-xrotation="<?php echo esc_attr($attributes['geometry_xrotation']);?>"
	data-geometry-yrotation="<?php echo esc_attr($attributes['geometry_yrotation']);?>"
	data-geometry-zrotation="<?php echo esc_attr($attributes['geometry_zrotation']);?>"
	data-geometry-instancing="<?php echo $attributes['geometry_instancing'] ? 'true' : 'false'; ?>"
	data-geometry-instancingNum="<?php echo esc_attr($attributes['geometry_instancingNum']);?>"
	data-geometry-instancingSpacing="<?php echo esc_attr($attributes['geometry_instancingSpacing']);?>"
	data-geometry-gltf="<?php echo esc_attr($attributes['gltf_url']);?>"
	data-light="<?php echo esc_attr($attributes['light']);?>"
	data-light-color="<?php echo esc_attr($attributes['light_color']);?>"
	data-light-intensity="<?php echo esc_attr($attributes['light_intensity']);?>"
	data-light-xpos="<?php echo esc_attr($attributes['light_xpos']);?>"
	data-light-ypos="<?php echo esc_attr($attributes['light_ypos']);?>"
	data-light-zpos="<?php echo esc_attr($attributes['light_zpos']);?>"
	data-camera-xpos="<?php echo esc_attr($attributes['camera_xpos']);?>"
	data-camera-ypos="<?php echo esc_attr($attributes['camera_ypos']);?>"
	data-camera-zpos="<?php echo esc_attr($attributes['camera_zpos']);?>"
	data-background="<?php echo esc_attr($attributes['background']);?>"
	data-particle-size="<?php echo esc_attr($attributes['particle_size']);?>"
	data-particle-speed="<?php echo esc_attr($attributes['particle_speed']);?>"
	data-particle-direction="<?php echo esc_attr($attributes['particle_direction']);?>"
	data-particle-color="<?php echo esc_attr($attributes['particle_color']);?>"
>
	<div class="ti-content">
		<?php echo $content; ?>
	</div>

</div>
