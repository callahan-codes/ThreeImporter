<?php

use function \WP_Block_Supports\render_block_core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$ti3d_style = '';

if (!empty($attributes['style']['color']['background'])) {
    $ti3d_style .= 'background-color:' . esc_attr( $attributes['style']['color']['background'] ) . ';';
}

if (!empty( $attributes['block_height'])) {
    $ti3d_style .= 'height:' . esc_attr($attributes['block_height']) . ';';
}

$ti3d_wrapper_attributes = get_block_wrapper_attributes( array(
    'style' => $ti3d_style,
    'class' => 'three-importer-container'
) );

$layout_justify = $attributes['inner_alignment'] ?? 'left';
$vertical_align = $attributes['inner_vertical_alignment'] ?? 'top';

$content_classes = array( 'ti-content' );
$content_classes[] = 'items-justified-' . esc_attr( $layout_justify );
$content_classes[] = 'is-vertically-aligned-' . esc_attr( $vertical_align );

$content_classes[] = 'has-text-align-' . esc_attr( $layout_justify );

$content_class_string = implode( ' ', $content_classes );

?>

<div <?php echo $ti3d_wrapper_attributes; ?>
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
    data-camera-orbitallowed="<?php echo $attributes['camera_orbit'] ? 'true' : 'false'; ?>"
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
    
    <div class="<?php echo esc_attr($content_class_string); ?>">
        <?php echo $content; ?>
    </div>

</div>