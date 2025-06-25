/**
 * 
 *  Script below written by Bryce Callahan
 *  Last Updated: 6/24/2025
 * 
 * The following code represents the edit functionality 
 * in WordPress's block editor. 
 * 
 */

// imports
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	ColorPalette
} from '@wordpress/components';
import './editor.scss';

// block editor functionality
export default function Edit({ attributes, setAttributes }) {

	// blockProps for handling HTML structure of block
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<InspectorControls>
				<Panel>

					{/* geometry settings */}
					<PanelBody title={__("Geometry Settings", "ti_blocks")}>

						{/* geometry type */}
						<SelectControl
							label={__("Type", "ti_blocks")}
							value={attributes.geometry}
							options={[
								{ label: __("Box", "ti_blocks"), value: "box" },
								{ label: __("Capsule", "ti_blocks"), value: "capsule" },
								{ label: __("Circle", "ti_blocks"), value: "circle" },
								{ label: __("Cone", "ti_blocks"), value: "cone" },
								{ label: __("Cylinder", "ti_blocks"), value: "cylinder" },
								{ label: __("Dodecahedron", "ti_blocks"), value: "dodecahedron" },
								{ label: __("Icosahedron", "ti_blocks"), value: "icosahedron" },
								{ label: __("Octahedron", "ti_blocks"), value: "octahedron" },
								{ label: __("Plane", "ti_blocks"), value: "plane" },
								{ label: __("Ring", "ti_blocks"), value: "ring" },
								{ label: __("Sphere", "ti_blocks"), value: "sphere" },
								{ label: __("Tetrahedron", "ti_blocks"), value: "tetrahedron" },
								{ label: __("Torus", "ti_blocks"), value: "torus" },
								{ label: __("Torus Knot", "ti_blocks"), value: "torusknot" },
								{ label: __("GLTF Model", "ti_blocks"), value: "gltf" },
							]}
							onChange={(geometry) => setAttributes({ geometry })}
						/>

						{/* geometry/gltf size */}
						<TextControl
							label={__("Size", "ti_blocks")}
							value={attributes.geometry_size}
							type="number"
							onChange={(value) => setAttributes({ geometry_size: value })}
						/>

						{/* gltf type selected */}
						{attributes.geometry === "gltf" ? (
							<TextControl
								label={__("GLTF Model URL", "ti_blocks")}
								value={attributes.gltf_url}
								onChange={(gltf_url) => setAttributes({ gltf_url })}
							/>
						) : (
							<>
								{/* gltf type not selected, show geometry options */}

								{/* geometry material */}
								<SelectControl
									label={__("Material", "ti_blocks")}
									value={attributes.geometry_material}
									options={[
										{ label: __("Basic", "ti_blocks"), value: "basic" },
										{ label: __("Lambert", "ti_blocks"), value: "lambert" },
										{ label: __("Phong", "ti_blocks"), value: "phong" },
										{ label: __("Standard", "ti_blocks"), value: "standard" },
										{ label: __("Physical", "ti_blocks"), value: "physical" },
									]}
									onChange={(geometry_material) => setAttributes({ geometry_material })}
								/>

								{/* geometry color */}
								<fieldset>
									<legend>{__("Color", "ti_blocks")}</legend>
									<ColorPalette
										value={attributes.geometry_color}
										colors={[
											{ name: "Black", color: "#000000" },
											{ name: "White", color: "#ffffff" },
											{ name: "Red", color: "#ff0000" },
											{ name: "Orange", color: "#ffa500" },
											{ name: "Yellow", color: "#ffff00" },
											{ name: "Green", color: "#00ff00" },
											{ name: "Blue", color: "#0000ff" },
											{ name: "Indigo", color: "#4b0082" },
											{ name: "Violet", color: "#ee82ee" }
										]}
										onChange={(geometry_color) => setAttributes({ geometry_color })}
									/>
								</fieldset>
							</>
						)}

						{/* geometry rotation */}
						<ToggleControl
							label={__("X Rotation", "ti_blocks")}
							checked={attributes.geometry_xrotation}
							onChange={(value) => setAttributes({ geometry_xrotation: value })}
						/>

						<ToggleControl
							label={__("Y Rotation", "ti_blocks")}
							checked={attributes.geometry_yrotation}
							onChange={(value) => setAttributes({ geometry_yrotation: value })}
						/>

						<ToggleControl
							label={__("Z Rotation", "ti_blocks")}
							checked={attributes.geometry_zrotation}
							onChange={(value) => setAttributes({ geometry_zrotation: value })}
						/>

					</PanelBody>

					{/* light settings */}
					<PanelBody title={__("Light Settings", "ti_blocks")}>

						{/* light type */}
						<SelectControl
							label={__("Type", "ti_blocks")}
							value={attributes.light}
							options={[
								{ label: __("directional", "ti_blocks"), value: "directional" },
								{ label: __("hemisphere", "ti_blocks"), value: "hemisphere" },
								{ label: __("point", "ti_blocks"), value: "point" },
								{ label: __("spotlight", "ti_blocks"), value: "spotlight" },
								{ label: __("ambient", "ti_blocks"), value: "ambient" }
							]}
							onChange={(light) => setAttributes({ light })}
						/>

						{/* light intensity */}
						<TextControl
							label={__("Intensity", "ti_blocks")}
							value={attributes.light_intensity}
							type="number"
							onChange={(value) => setAttributes({ light_intensity: value })}
						/>

						{/* light color */}
						<fieldset>
							<legend>{__("Color", "ti_blocks")}</legend>
							<ColorPalette
								value={attributes.light_color}
								colors={[
									{ name: "Black", color: "#000000" },
									{ name: "White", color: "#ffffff" },
									{ name: "Red", color: "#ff0000" },
									{ name: "Orange", color: "#ffa500" },
									{ name: "Yellow", color: "#ffff00" },
									{ name: "Green", color: "#00ff00" },
									{ name: "Blue", color: "#0000ff" },
									{ name: "Indigo", color: "#4b0082" },
									{ name: "Violet", color: "#ee82ee" }
								]}
								onChange={(light_color) => setAttributes({ light_color })}
							/>
						</fieldset>

						{/* light x position */}
						<TextControl
							label={__("X Position", "ti_blocks")}
							value={attributes.light_xpos}
							type="number"
							onChange={(value) => setAttributes({ light_xpos: value })}
						/>

						{/* light y position */}
						<TextControl
							label={__("Y Position", "ti_blocks")}
							value={attributes.light_ypos}
							type="number"
							onChange={(value) => setAttributes({ light_ypos: value })}
						/>

						{/* light z position */}
						<TextControl
							label={__("Z Position", "ti_blocks")}
							value={attributes.light_zpos}
							type="number"
							onChange={(value) => setAttributes({ light_zpos: value })}
						/>

					</PanelBody>

					{/* camera settings */}
					<PanelBody title={__("Camera Settings", "ti_blocks")}>

						{/* camera x position */}
						<TextControl
							label={__("X Position", "ti_blocks")}
							value={attributes.camera_xpos}
							type="number"
							onChange={(value) => setAttributes({ camera_xpos: value })}
						/>

						{/* camera y position */}
						<TextControl
							label={__("Y Position", "ti_blocks")}
							value={attributes.camera_ypos}
							type="number"
							onChange={(value) => setAttributes({ camera_ypos: value })}
						/>

						{/* camera z position */}
						<TextControl
							label={__("Z Position", "ti_blocks")}
							value={attributes.camera_zpos}
							type="number"
							onChange={(value) => setAttributes({ camera_zpos: value })}
						/>

						{/* camera rotation */}
						<ToggleControl
							label={__("X Rotation", "ti_blocks")}
							checked={attributes.camera_xrotation}
							onChange={(value) => setAttributes({ camera_xrotation: value })}
						/>

						<ToggleControl
							label={__("Y Rotation", "ti_blocks")}
							checked={attributes.camera_yrotation}
							onChange={(value) => setAttributes({ camera_yrotation: value })}
						/>

						<ToggleControl
							label={__("Z Rotation", "ti_blocks")}
							checked={attributes.camera_zrotation}
							onChange={(value) => setAttributes({ camera_zrotation: value })}
						/>
					</PanelBody>

					{/* instancing settings */}
					<PanelBody title={__("Instancing Settings", "ti_blocks")}>

						{/* toggle instancing */}
						<ToggleControl
							label={__("Instancing", "ti_blocks")}
							checked={attributes.geometry_instancing}
							onChange={(value) => setAttributes({ geometry_instancing: value })}
						/>

						{/* instancing enabled */}
						{attributes.geometry_instancing && (
							<>
								{/* number of instances */}
								<TextControl
									label={__("Number of Instances", "ti_blocks")}
									value={attributes.geometry_instancingNum}
									type="number"
									onChange={(value) => setAttributes({ geometry_instancingNum: value })}
								/>

								{/* spacing */}
								<TextControl
									label={__("Instance Spacing", "ti_blocks")}
									value={attributes.geometry_instancingSpacing}
									type="number"
									onChange={(value) => setAttributes({ geometry_instancingSpacing: value })}
								/>
							</>
						)}
	
					</PanelBody>

				</Panel>
			</InspectorControls>

			{/* editor block message & InnerBlocks */}
			<h2 style={{ textAlign: 'center' }}>{__('Your three.js scene will render on the front end.', 'threeimporter')}</h2>
			<p style={{ textAlign: 'center'}}>{__('Scene Settings can be found in the Block settings. Enter other blocks below.', 'threeimporter')}</p>
			<InnerBlocks />
		</div>
	);
}
