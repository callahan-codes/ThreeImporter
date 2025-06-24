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
	data-geometry-gltf="<?php echo esc_attr($attributes['gltf_url']);?>"
	data-light="<?php echo esc_attr($attributes['light']);?>"
	data-light-color="<?php echo esc_attr($attributes['light_color']);?>"
	data-light-intensity="<?php echo esc_attr($attributes['light_intensity']);?>"
	data-light-xpos="<?php echo esc_attr($attributes['light_xpos']);?>"
	data-light-ypos="<?php echo esc_attr($attributes['light_ypos']);?>"
	data-light-zpos="<?php echo esc_attr($attributes['light_zpos']);?>"
>
	<div class="ti-content">
		<?php echo $content; ?>
	</div>

</div>
