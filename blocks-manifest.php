<?php
// This file is generated. Do not modify it manually.
return array(
	'three-importer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'ti-blocks/three-importer',
		'version' => '1.0.5',
		'title' => 'Three Importer',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'attributes' => array(
			'inner_vertical_alignment' => array(
				'type' => 'string',
				'default' => 'top'
			),
			'block_height' => array(
				'type' => 'string',
				'default' => '400px'
			),
			'geometry' => array(
				'type' => 'string',
				'default' => 'box'
			),
			'geometry_color' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'geometry_size' => array(
				'type' => 'integer',
				'default' => 1
			),
			'geometry_material' => array(
				'type' => 'string',
				'default' => 'phong'
			),
			'geometry_xrotation' => array(
				'type' => 'string',
				'default' => '0'
			),
			'geometry_yrotation' => array(
				'type' => 'string',
				'default' => '0'
			),
			'geometry_zrotation' => array(
				'type' => 'string',
				'default' => '0'
			),
			'geometry_instancing' => array(
				'type' => 'boolean',
				'default' => false
			),
			'geometry_instancingnum' => array(
				'type' => 'string',
				'default' => '50'
			),
			'geometry_instancingspacing' => array(
				'type' => 'string',
				'default' => '1'
			),
			'gltf_url' => array(
				'type' => 'string',
				'default' => ''
			),
			'trid_text' => array(
				'type' => 'string',
				'default' => 'TI'
			),
			'trid_color' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'trid_size' => array(
				'type' => 'string',
				'default' => '1'
			),
			'light' => array(
				'type' => 'string',
				'default' => 'ambient'
			),
			'light_color' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'light_intensity' => array(
				'type' => 'string',
				'default' => '1'
			),
			'light_xpos' => array(
				'type' => 'string',
				'default' => '0'
			),
			'light_ypos' => array(
				'type' => 'string',
				'default' => '0'
			),
			'light_zpos' => array(
				'type' => 'string',
				'default' => '0'
			),
			'light_helper' => array(
				'type' => 'boolean',
				'default' => false
			),
			'camera_xpos' => array(
				'type' => 'string',
				'default' => '5'
			),
			'camera_ypos' => array(
				'type' => 'string',
				'default' => '0'
			),
			'camera_zpos' => array(
				'type' => 'string',
				'default' => '0'
			),
			'camera_xtarget' => array(
				'type' => 'string',
				'default' => '0'
			),
			'camera_ytarget' => array(
				'type' => 'string',
				'default' => '0'
			),
			'camera_ztarget' => array(
				'type' => 'string',
				'default' => '0'
			),
			'camera_followmouse' => array(
				'type' => 'boolean',
				'default' => false
			),
			'scene_background' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'particle_amount' => array(
				'type' => 'string',
				'default' => '1000'
			),
			'particle_size' => array(
				'type' => 'string',
				'default' => '1'
			),
			'particle_speed' => array(
				'type' => 'string',
				'default' => '5'
			),
			'particle_direction' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'particle_color' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'particle_stretch' => array(
				'type' => 'string',
				'default' => '5'
			),
			'cubegrid_stretch' => array(
				'type' => 'string',
				'default' => '120'
			),
			'cubegrid_spacing' => array(
				'type' => 'integer',
				'default' => '1'
			),
			'cubegrid_material' => array(
				'type' => 'string',
				'default' => 'phong'
			),
			'cubegrid_color' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			)
		),
		'supports' => array(
			'html' => false,
			'innerBlocks' => true,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'color' => array(
				'background' => true,
				'gradients' => true
			),
			'typography' => array(
				'lineHeight' => true,
				'fontSize' => true
			),
			'layout' => array(
				'allowJustification' => false,
				'allowOrientation' => false
			)
		),
		'textdomain' => 'three-importer',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
