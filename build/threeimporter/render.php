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
	data-geometry-enableXRotation="<?php echo esc_attr($attributes['geometry_xrotation']);?>"
	data-geometry-enableYRotation="<?php echo esc_attr($attributes['geometry_yrotation']);?>"
	data-geometry-enableZRotation="<?php echo esc_attr($attributes['geometry_zrotation']);?>"
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
	data-camera-xrotation="<?php echo esc_attr($attributes['camera_xrotation']);?>"
	data-camera-yrotation="<?php echo esc_attr($attributes['camera_yrotation']);?>"
	data-camera-zrotation="<?php echo esc_attr($attributes['camera_zrotation']);?>"
>
	<div class="ti-content">
		<?php echo $content; ?>
	</div>

</div>
