=== Three Importer ===
Contributors:      callahancodes
Tags:              threejs, 3D
Tested up to:      6.9
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A powerful ThreeJS WordPress plugin for creating 3D scenes via blocks, shortcodes, or custom script injection.

== Description ==
Three Importer allows users to insert custom ThreeJS scenes which can be implemented via Block editor, shortcode, or custom script injection. This allows people with little-to-no coding experience to well-seasoned developers to create beautiful, 3D scenes with full control over the settings.

# Block Support
Three Importer has full support with the official WordPress Block Editor. Simply type and select "/Three Importer" in your page editor and you'll see the 3D render notice for the public view.

# Shortcode Support
Three Importer allows the exact same functionality from blocks within the `[ti3d_scene]` shortcode. Developers can also use the `[ti3d_sceneinject]` shortcode to call project-specific libraries from THREE and use them within custom scripts.

== [ti3d_scene] Parameters ==

= Geometry Settings =
* `geometry` : Type of 3D shape (default: box).
* `geometry_color` : Hex color code (default: #000000).
* `geometry_material` : Three.js material type (default: basic).
* `geometry_size` : Scaling factor (default: 1).
* `geometry_xrotation` / `yrotation` / `zrotation` : Initial rotation.
* `geometry_instancing` : Enable instanced rendering (default: false).
* `geometry_instancingnum` : Total instances (default: 50).
* `geometry_instancingspacing` : Gap between instances (default: 1).
* `gltf_url` : URL for external GLTF/GLB models.

= Lighting Settings =
* `light` : Light source type (default: ambient).
* `light_color` : Color of the light (default: #ffffff).
* `light_intensity` : Brightness (default: 1).
* `light_xpos` / `ypos` / `zpos` : Light coordinates (default: 0).
* `light_helper` : Toggle visual position guide (default: false).

= Camera Settings =
* `camera_xpos` / `ypos` / `zpos` : Camera coordinates.
* `camera_xtarget` / `ytarget` / `ztarget` : Camera look-at target.
* `camera_followmouse` : Enable mouse-tracking (default: false).

= Particles & Scene =
* `scene_background` : Background color or transparency (default: none).
* `particle_amount` : Total particles (default: 1000).
* `particle_size` : Size of particles (default: 1).
* `particle_speed` : Movement speed (default: 5).
* `particle_direction` : Flow direction (default: right).
* `particle_color` : Particle hex color (default: #000000).
* `particle_stretch` : Motion stretch factor (default: 5).

= Grid & Text =
* `cubegrid_stretch` : Grid stretch amount (default: 120).
* `cubegrid_spacing` : Distance between grid cubes (default: 1).
* `cubegrid_material` : Material for the grid (default: phong).
* `cubegrid_color` : Grid hex color (default: #ffffff).
* `trid_text` : String of text to render in 3D (default: TI).
* `trid_color` : Color of 3D text (default: #ffffff).
* `trid_size` : Depth/Size of 3D text (default: 1).

== [ti3d_sceneinject] Available Modules ==
When using the inject shortcode (e.g., `[ti3d_sceneinject orbitcontrols gltfloader]`), the following modules are available to be exposed to the global `THREE` object:

* **Controls:** orbitcontrols, flycontrols, firstpersoncontrols, pointerlockcontrols, trackballcontrols
* **Loaders:** gltfloader, objloader, fbxloader, textureloader, cubetextureloader, dracoloader, rgbeloader
* **Post-Processing:** effectcomposer, renderpass, unrealbloompass, shaderpass, ssaopass
* **Shaders:** fxaashader, copyshader, luminosityshader, sobeloperatorshader
* **Geometry:** boxlinegeometry, convexgeometry, parametricgeometry, teapotgeometry
* **Helpers:** gridhelper, axeshelper, camerahelper, directionallighthelper
* **Misc:** animationmixer, gui

== Installation ==
1. Download the ZIP folder from the repository.
2. In your WordPress dashboard, go to Plugins > Add New > Upload Plugin.
3. Select the ZIP folder and click Install Now.
4. Activate the plugin.

== Frequently Asked Questions ==

Q: Why cant I see my Geometry? 
A: Check your Camera Position, Geometry Position, or Geometry Rotation. Ensure the camera position isn't inside the mesh position.

Q: Why are multiple instances of THREE being imported?
A: This happens when using multiple TI implementations. Stick to using just blocks or either shortcodes on a single page (avoid mixmatching both TI blocks and TI shortcodes on a single page). This warning shouldn't break anything, as it's just a warning, but will slow that page's loading speed.

Q: How can I use the custom scene inject function?
A: Place the shortcode `[ti3d_sceneinject module1 module2 ...]`, then add the TI id to a div and your script in a Custom HTML block.
    [ti3d_sceneinject orbitcontrols axeshelper]

    <div class="three-importer-container" id="ti"></div>
    <script>
    document.addEventListener('three-modules-ready', () => {

        const scene = new THREE.Scene();
        const container = document.getElementById('ti');
        const width = container.clientWidth;
        const height = container.clientHeight;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        if (THREE.AxesHelper) {
            const axesHelper = new THREE.AxesHelper(3);
            scene.add(axesHelper);
        }

        let controls;
        if (THREE.OrbitControls) {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
        }

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            if (controls) controls.update();
            renderer.render(scene, camera);
        }

        animate();
    });
    </script>

== Screenshots ==
1. Sample Page using Block
2. Editor Page using Block
3. Sample Page using `[ti3d_scene]` shortcode
4. Editor Page using `[ti3d_scene]` shortcode
5. Sample Page using `[ti3d_sceneinject]` shortcode
6. Editor Page using `[ti3d_sceneinject]` shortcode

== Source Code ==
Source Repository: https://github.com/callahan-codes/ThreeImporter

== Changelog ==
= 1.0.0 =
* Initial Release.