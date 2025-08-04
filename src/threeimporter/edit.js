/**
 * 
 *  - Geometry settings
 * 	- Light settings
 * 	- Camera settings
 * 	- Instancing settings
 *  - Background settings
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
	ColorPalette,
	Notice,
	ResizableBox
} from '@wordpress/components';
import './editor.scss';

// block editor functionality
export default function Edit({ attributes, setAttributes }) {

	const numericHeight = parseInt(attributes.block_height, 10) || 400;

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
								{ label: __("3D Text", "ti_blocks"), value: "3dtext" },
							]}
							onChange={(geometry) => setAttributes({ geometry })}
						/>
						

						{/* geometry/gltf size */}
						{attributes.geometry === "gltf" ? (

							<TextControl
								label={__("GLTF Model URL", "ti_blocks")}
								value={attributes.gltf_url}
								onChange={(gltf_url) => setAttributes({ gltf_url })}
							/>

						) : attributes.geometry === "3dtext" ? (
							<>
								<TextControl
									label={__("Text to show", "ti_blocks")}
									value={attributes.trid_text}
									onChange={(trid_text) => setAttributes({ trid_text })}
								/>	

								<fieldset>
									<legend>{__("Color", "ti_blocks")}</legend>
									<ColorPalette
										value={attributes.trid_color}
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
										onChange={(trid_color) => setAttributes({ trid_color })}
									/>
								</fieldset>		

								<TextControl
									label={__("Size", "ti_blocks")}
									value={attributes.trid_size}
									type="number"
									onChange={(value) => setAttributes({ trid_size: value })}
								/>	
							
							</>

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

						{attributes.geometry !== "3dtext" && (
							<>
								{/* geometry rotation */}
								<TextControl
									label={__("X Rotation", "ti_blocks")}
									value={attributes.geometry_xrotation}
									type="number"
									onChange={(value) => setAttributes({ geometry_xrotation: value })}
								/>

								<TextControl
									label={__("Y Rotation", "ti_blocks")}
									value={attributes.geometry_yrotation}
									type="number"
									onChange={(value) => setAttributes({ geometry_yrotation: value })}
								/>

								<TextControl
									label={__("Z Rotation", "ti_blocks")}
									value={attributes.geometry_zrotation}
									type="number"
									onChange={(value) => setAttributes({ geometry_zrotation: value })}
								/>
							</>
						)}

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

						{attributes.light !== 'spotlight' && attributes.light !== 'ambient' && (
							<>

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

							</>
						)}

						<ToggleControl
							label={__("Light Helper", "ti_blocks")}
							checked={attributes.light_helper}
							onChange={(value) => setAttributes({ light_helper: value })}
						/>

					</PanelBody>

					{/* camera settings */}
					<PanelBody title={__("Camera Settings", "ti_blocks")}>

						<ToggleControl
							label={__("Mouse Follow", "ti_blocks")}
							checked={attributes.camera_followmouse}
							onChange={(value) => setAttributes({ camera_followmouse: value })}
						/>

						{attributes.camera_followmouse !== true && (
							<>
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

								{/* camera target */}
								<TextControl
									label={__("Target X", "ti_blocks")}
									value={attributes.camera_xtarget}
									type="number"
									onChange={(value) => setAttributes({ camera_xtarget: value })}
								/>

								<TextControl
									label={__("Target Y", "ti_blocks")}
									value={attributes.camera_ytarget}
									type="number"
									onChange={(value) => setAttributes({ camera_ytarget: value })}
								/>

								<TextControl
									label={__("Target Z", "ti_blocks")}
									value={attributes.camera_ztarget}
									type="number"
									onChange={(value) => setAttributes({ camera_ztarget: value })}
								/>
							</>
						)}
						
					</PanelBody>

					{/* instancing settings */}
					<PanelBody title={__("Instancing Settings", "ti_blocks")}>

						{/* toggle instancing */}
						{attributes.geometry !== "gltf" ? (
							<>
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
											value={attributes.geometry_instancingnum}
											type="number"
											onChange={(value) => setAttributes({ geometry_instancingnum: value })}
										/>

										{/* spacing */}
										<TextControl
											label={__("Instance Spacing", "ti_blocks")}
											value={attributes.geometry_instancingspacing}
											type="number"
											onChange={(value) => setAttributes({ geometry_instancingspacing: value })}
										/>
									</>
								)}

							</>
						) : (
							// no instancing for gltf
							<>
								<Notice status="warning" isDismissible={false}>
									{__("Instancing is not supported for URL-based models.", "ti_blocks")}
								</Notice>
							</>
						)}
	
					</PanelBody>

					{/* backgrounds */}
					<PanelBody title={__("Backgrounds", "ti_blocks")}>

						{/* background type */}
						<SelectControl
							label={__("Type", "ti_blocks")}
							value={attributes.scene_background}
							options={[
								{ label: __("None", "ti_blocks"), value: "none" },
								{ label: __("Particles", "ti_blocks"), value: "particles" },
								{ label: __("CubeGrid", "ti_blocks"), value: "cubegrid" },
							]}
							onChange={(scene_background) => setAttributes({ scene_background })}
						/>

							
						{attributes.scene_background === "particles" && (
							<>

								{/* particle amount */}
								<TextControl
									label={__("Amount", "ti_blocks")}
									value={attributes.particle_amount}
									type="number"
									onChange={(value) => setAttributes({ particle_amount: value })}
								/>

								{/* particle size */}
								<TextControl
									label={__("Size", "ti_blocks")}
									value={attributes.particle_size}
									type="number"
									onChange={(value) => setAttributes({ particle_size: value })}
								/>

								{/* particle speed */}
								<TextControl
									label={__("Speed", "ti_blocks")}
									value={attributes.particle_speed}
									type="number"
									onChange={(value) => setAttributes({ particle_speed: value })}
								/>

								{attributes.particle_speed < 0 && (
									<Notice status="warning" isDismissible={false}>
										{__("A negative value for particle speed will affect its animation.", "ti_blocks")}
									</Notice>
								)}

								{/* particle direction */}
								<SelectControl
									label={__("Direction", "ti_blocks")}
									value={attributes.particle_direction}
									options={[
										{ label: __("Up", "ti_blocks"), value: "up" },
										{ label: __("Down", "ti_blocks"), value: "down" },
										{ label: __("Right", "ti_blocks"), value: "right" },
										{ label: __("Left", "ti_blocks"), value: "left" },
									]}
									onChange={(particle_direction) => setAttributes({ particle_direction })}
								/>
								
								{/* particle stretch */}
								<TextControl
									label={__("Stretch", "ti_blocks")}
									value={attributes.particle_stretch}
									type="number"
									onChange={(value) => setAttributes({ particle_stretch: value })}
								/>

								{/* particle color */}
								<fieldset>
									<legend>{__("Color", "ti_blocks")}</legend>
									<ColorPalette
										value={attributes.particle_color}
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
										onChange={(particle_color) => setAttributes({ particle_color })}
									/>
								</fieldset>

							</>
						)}

						{attributes.scene_background === "cubegrid" && (
							<>
								{/* cube stretch/amount */}
								<TextControl
									label={__("Stretch", "ti_blocks")}
									value={attributes.cubegrid_stretch}
									type="number"
									onChange={(value) => setAttributes({ cubegrid_stretch: value })}
								/>

								{/* cube spacing */}
								<TextControl
									label={__("Spacing", "ti_blocks")}
									value={attributes.cubegrid_spacing}
									type="number"
									onChange={(value) => setAttributes({ cubegrid_spacing: value })}
								/>

								{/* cube material */}
								<SelectControl
									label={__("Material", "ti_blocks")}
									value={attributes.cubegrid_material}
									options={[
										{ label: __("Basic", "ti_blocks"), value: "basic" },
										{ label: __("Lambert", "ti_blocks"), value: "lambert" },
										{ label: __("Phong", "ti_blocks"), value: "phong" },
										{ label: __("Standard", "ti_blocks"), value: "standard" },
										{ label: __("Physical", "ti_blocks"), value: "physical" },
									]}
									onChange={(cubegrid_material) => setAttributes({ cubegrid_material })}
								/>

								{/* cube color */}
								<fieldset>
									<legend>{__("Color", "ti_blocks")}</legend>
									<ColorPalette
										value={attributes.cubegrid_color}
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
										onChange={(cubegrid_color) => setAttributes({ cubegrid_color })}
									/>
								</fieldset>

								

								{attributes.cubegrid_stretch < 0 && (
									<Notice status="warning" isDismissible={false}>
										{__("Using a negative numeric value will affect the CubeGrid's layout. Your negative input will be converted to positive.", "ti_blocks")}
									</Notice>
								)}
							</>
						)}
					</PanelBody>

				</Panel>
			</InspectorControls>

			{/* editor view */}
			<ResizableBox
				size={{
					height: numericHeight,
					width: '100%',
				}}
				minHeight="100"
				enable={{
					top: false,
					right: false,
					bottom: true,
					left: false,
					topRight: false,
					bottomRight: false,
					bottomLeft: false,
					topLeft: false,
				}}
				onResizeStop={(event, direction, elt, delta) => {
					const newHeight = numericHeight + delta.height;
					setAttributes({ block_height: `${newHeight}px` });
				}}
				className="ti-block-resizable-box"
			>
				<div style={{ height: attributes.block_height ? attributes.block_height : 'auto', width: '100%', overflow: 'hidden' }}>
					<div className="ti-block-heading">
						<h2>
							{__('Your three.js scene will render on the front end.', 'threeimporter')}
						</h2>
						<p>
							{__('Scene Settings can be found in the Block settings. Enter other blocks below.', 'threeimporter')}
						</p>
					</div>
					
					<div className="ti-inner-wrapper" style={{ width: '100%' }}>
						<InnerBlocks />
					</div>
				</div>
			</ResizableBox>
		</div>
	);
}
