<?php
// This file is generated. Do not modify it manually.
return array(
	'threeimporter' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'ti-blocks/threeimporter',
		'version' => '0.1.0',
		'title' => 'Three Importer',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'attributes' => array(
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
				'default' => 'basic'
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
			'geometry_instancingNum' => array(
				'type' => 'string',
				'default' => '50'
			),
			'geometry_instancingSpacing' => array(
				'type' => 'string',
				'default' => '1'
			),
			'gltf_url' => array(
				'type' => 'string',
				'default' => ''
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
				'default' => '1'
			),
			'light_ypos' => array(
				'type' => 'string',
				'default' => '1'
			),
			'light_zpos' => array(
				'type' => 'string',
				'default' => '1'
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
			'background' => array(
				'type' => 'string',
				'default' => 'none'
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
			)
		),
		'supports' => array(
			'html' => true,
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
				'text' => true,
				'background' => true,
				'gradients' => true
			)
		),
		'textdomain' => 'threeimporter',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
