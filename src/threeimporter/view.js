/**
 * 
 *  Script below written by Bryce Callahan
 *  Last Updated: 6/24/2025
 * 
 *  ...
 * 
*/

// threejs imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

// on page load
document.addEventListener('DOMContentLoaded', () => {
    
    // console log for user
    console.log('Three Importer has successfully loaded.');

    // all TI containers
    document.querySelectorAll('.three-importer-container').forEach(container => {

        // prevent multiple initializations
        if (container.dataset.initialized) return;
        container.dataset.initialized = 'true';
 
        // geometry attributes
        const geometryType = container.getAttribute('data-geometry-type') || 'box';
        const geometrySize = parseInt(container.getAttribute('data-geometry-size'), 10) || 1;
        const geometryMaterial = container.getAttribute('data-geometry-material') || 'phong';
        const geometryColor = container.getAttribute('data-geometry-color') || '#000000';
        const gltfURL = container.getAttribute('data-geometry-gltf') || '';
        const tridText= container.getAttribute('data-geometry-tridText') || 'Hello World!';
        const tridTextColor= container.getAttribute('data-tridText-color') || '#FFFFFF';
        const tridTextSize = parseInt(container.getAttribute('data-tridText-size'), 10) || 1;

        // geometry instancing attributes
        const geometryInstancing = container.getAttribute('data-geometry-instancing') === 'true';
        const geometryInstancingNum = parseInt(container.getAttribute('data-geometry-instancingNum'), 10) || 50;
        const geometryInstancingSpacing = parseInt(container.getAttribute('data-geometry-instancingSpacing'), 10) || 1;

        // light attributes
        const lightType = container.getAttribute('data-light') || 'ambient';
        const lightColor = container.getAttribute('data-light-color') || '#FFFFFF';
        const lightIntensity = parseInt(container.getAttribute('data-light-intensity'), 10) || 1;
        const lightXPos = parseInt(container.getAttribute('data-light-xpos'), 10) || 0;
        const lightYPos = parseInt(container.getAttribute('data-light-ypos'), 10) || 0;
        const lightZPos = parseInt(container.getAttribute('data-light-zpos'), 10) || 0;
        const lightHelper = container.getAttribute('data-light-helper') === 'true';

        // camera attributes
        const cameraXPos = parseInt(container.getAttribute('data-camera-xpos'), 10) || 5;
        const cameraYPos = parseInt(container.getAttribute('data-camera-ypos'), 10) || 0;
        const cameraZPos = parseInt(container.getAttribute('data-camera-zpos'), 10) || 0;
        const cameraXTarget = parseInt(container.getAttribute('data-camera-xtarget'), 10) || 0;
        const cameraYTarget = parseInt(container.getAttribute('data-camera-ytarget'), 10) || 0;
        const cameraZTarget = parseInt(container.getAttribute('data-camera-ztarget'), 10) || 0;
        const cameraFollowMouse = container.getAttribute('data-camera-followMouse') === 'true';

        // rotation attributes
        const geometryXRotation = parseInt(container.getAttribute('data-geometry-xrotation'), 10) || 0;
        const geometryYRotation = parseInt(container.getAttribute('data-geometry-yrotation'), 10) || 0;
        const geometryZRotation = parseInt(container.getAttribute('data-geometry-zrotation'), 10) || 0;

        // background attributes
        const background = container.getAttribute('data-scene-background') || 'none';
        const particleAmount = parseInt(container.getAttribute('data-particle-amount'), 10) || 1000;
        const particleSize = parseInt(container.getAttribute('data-particle-size'), 10) || 1;
        const particleSpeed = parseInt(container.getAttribute('data-particle-speed'), 10) || 5;
        const particleDirection = container.getAttribute('data-particle-direction') || 'right';
        const particleColor = container.getAttribute('data-particle-color') || '#000000';
        const particleStretch = parseInt(container.getAttribute('data-particle-stretch'), 10) || 5;
        const cubegridStretch = parseInt(container.getAttribute('data-cubegrid-stretch'), 10) || 15;
        const cubegridSpacing = parseInt(container.getAttribute('data-cubegrid-spacing'), 10) || 1;
        const cubegridMaterial = container.getAttribute('data-cubegrid-material') || 'phong';
        const cubegridColor = container.getAttribute('data-cubegrid-color') || '#FFFFFF';

        // other variables
        const clock = new THREE.Clock();
        const cubegridOffsets = [];
        let mesh,
            particles, particlesGeo, particlesMat,
            cubegridInstance, mouse = { x: 0, y: 0 };

        // threejs scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 5000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // setup user-made components
        buildCamera();
        buildMesh();
        buildLight();
        buildBackground();

        // threejs main animation loop
        function animate(){
            requestAnimationFrame(animate);

            // rotate mesh
            if(geometryType != "3dtext") {
                if(geometryXRotation != 0) rotateObject('x', geometryXRotation);
                if(geometryYRotation != 0) rotateObject('y', geometryYRotation);
                if(geometryZRotation != 0) rotateObject('z', geometryZRotation);
            }
            

            // camera mouse follow
            if (cameraFollowMouse) {
                updateCameraFollowMouse(camera);
            }

            // backgrounds
            if(background === 'particles') {

                // access particle positions
                const positions = particlesGeo.attributes.position.array;
                for (let i = 0; i < particleAmount * 3; i += 3) {

                    // direction
                    if(particleDirection === 'up') positions[i + 1] += (particleSpeed * 0.01);
                    if(particleDirection === 'down') positions[i + 1] -= (particleSpeed * 0.01);
                    if(particleDirection === 'right') positions[i + 2] -= (particleSpeed * 0.01);
                    if(particleDirection === 'left') positions[i + 2] += (particleSpeed * 0.01);

                    // reset position threshold | up/down/left/right
                    if(positions[i + 1] > particleStretch) positions[i + 1] = -particleStretch; 
                    if(positions[i + 1] < -particleStretch) positions[i + 1] = particleStretch; 
                    if(positions[i + 2] < -particleStretch) positions[i + 2] = particleStretch;
                    if(positions[i + 2] < -particleStretch) positions[i + 2] = particleStretch;

                }

                // update position
                particlesGeo.attributes.position.needsUpdate = true;
            }
            if (background === 'cubegrid') {
                const t = clock.getElapsedTime();
                const dummy = new THREE.Object3D();

                let index = 0;
                const halfSize = (cubegridStretch - 1) * 0.5 * cubegridSpacing;

                for (let i = 0; i < cubegridStretch; i++) {
                    for (let j = 0; j < cubegridStretch; j++) {
                        const offset = cubegridOffsets[index];
                        const x = Math.sin(t + offset) * 0.5 - 10;
                        const y = i * cubegridSpacing - halfSize;
                        const z = j * cubegridSpacing - halfSize;

                        dummy.position.set(x, y, z);
                        dummy.updateMatrix();
                        cubegridInstance.setMatrixAt(index, dummy.matrix);

                        index++;
                    }
                }

                cubegridInstance.instanceMatrix.needsUpdate = true;
            }

            
            if (controls) controls.update();
            renderer.render(scene, camera);
        }
        animate();

        // threejs render resize
        function resizeRenderer(){
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        resizeRenderer();
        window.addEventListener('resize', resizeRenderer);

        // build camera/controls
        function buildCamera() {
            camera.position.set(cameraXPos, cameraYPos, cameraZPos);
            controls.target.set(cameraXTarget, cameraYTarget, cameraZTarget);

            if(cameraFollowMouse) {
                document.addEventListener('mousemove', (event) => {
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                });
            }
        }

        // build mesh function
        function buildMesh() {

            if(geometryType === 'gltf'){
                loadGLTF();
            } 
            else if (geometryType === '3dtext'){
                loadTextGeo();
            }
            else {
                let assignedMaterial, assignedGeometry;

                // geometry material selection
                switch (geometryMaterial) {
                    case 'lambert':
                        assignedMaterial = new THREE.MeshLambertMaterial({ color: geometryColor });
                        break;
                    case 'phong':
                        assignedMaterial = new THREE.MeshPhongMaterial({ color: geometryColor });
                        break;
                    case 'standard':
                        assignedMaterial = new THREE.MeshStandardMaterial({ color: geometryColor });
                        break;
                    case 'physical':
                        assignedMaterial = new THREE.MeshPhysicalMaterial({ color: geometryColor });
                        break;
                    case 'basic':
                    default:
                        assignedMaterial = new THREE.MeshBasicMaterial({ color: geometryColor });
                        break;
                }

                // geometry type selection
                switch(geometryType){
                    case 'torusknot':
                        assignedGeometry = new THREE.TorusKnotGeometry(geometrySize, geometrySize * 0.33, 100, 16);
                        break;
                    case 'tetrahedron':
                        assignedGeometry = new THREE.TetrahedronGeometry(geometrySize, 0);
                        break;
                    case 'sphere':
                        assignedGeometry = new THREE.SphereGeometry(geometrySize, 64, 32);
                        break;
                    case 'ring':
                        assignedGeometry = new THREE.RingGeometry(geometrySize, geometrySize * 5, 32);
                        break;
                    case 'plane':
                        assignedGeometry = new THREE.PlaneGeometry(geometrySize, geometrySize);
                        break;
                    case 'octahedron':
                        assignedGeometry = new THREE.OctahedronGeometry(geometrySize, 0);
                        break;
                    case 'icosahedron':
                        assignedGeometry = new THREE.IcosahedronGeometry(geometrySize, 0);
                        break;
                    case 'dodecahedron':
                        assignedGeometry = new THREE.DodecahedronGeometry(geometrySize, 0);
                        break;
                    case 'cylinder':
                        assignedGeometry = new THREE.CylinderGeometry(geometrySize, geometrySize, 20, 32);
                        break;
                    case 'cone':
                        assignedGeometry = new THREE.ConeGeometry(geometrySize, geometrySize*4, 32);
                        break;
                    case 'circle':
                        assignedGeometry = new THREE.CircleGeometry(geometrySize, 32);
                        break;
                    case 'capsule':
                        assignedGeometry = new THREE.CapsuleGeometry(geometrySize, geometrySize, 4, 8);
                        break;
                    case 'torus':
                        assignedGeometry = new THREE.TorusGeometry(geometrySize, geometrySize / 50, 16, 100);
                        break;
                    case 'box':
                        assignedGeometry = new THREE.BoxGeometry(geometrySize, geometrySize, geometrySize);
                        break;
                    default:
                        break;
                }

                assignedMaterial.side = THREE.DoubleSide;

                if(geometryInstancing){

                    mesh = new THREE.InstancedMesh(assignedGeometry, assignedMaterial, geometryInstancingNum);
                    buildInstancedMesh();
                    scene.add(mesh)

                } else {

                    // create single geometry
                    mesh = new THREE.Mesh(assignedGeometry, assignedMaterial);
                    scene.add(mesh);
                }

            }
        }

        // build light function
        function buildLight() {

            let dynamicLight;
            let dynamicLightHelper;
            const dynamicLightColor = new THREE.Color(lightColor);

            switch(lightType) {
                case 'directional':
                    const directionalLight = new THREE.DirectionalLight(dynamicLightColor, lightIntensity);
                    dynamicLight = directionalLight;
                    dynamicLightHelper = new THREE.DirectionalLightHelper(dynamicLight, 5);
                    break;
                case 'hemisphere':
                    const hemiLight = new THREE.HemisphereLight(dynamicLightColor, lightIntensity);
                    dynamicLight = hemiLight;
                    dynamicLightHelper = new THREE.HemisphereLightHelper(dynamicLight, 5);
                    break;
                case 'point':
                    const pointLight = new THREE.PointLight(dynamicLightColor, lightIntensity, 100);
                    dynamicLight = pointLight;
                    dynamicLightHelper = new THREE.PointLightHelper(dynamicLight, 5);
                    break;
                case 'spotlight':
                    const spotLight = new THREE.SpotLight(dynamicLightColor, lightIntensity); 
                    spotLight.position.set(10, 10, 10);
                    spotLight.angle = Math.PI / 12; 
                    spotLight.penumbra = 0.2; 
                    spotLight.decay = 2; 
                    spotLight.distance = 30; 
                    spotLight.castShadow = true;
                    dynamicLight = spotLight;
                    dynamicLightHelper = new THREE.SpotLightHelper(dynamicLight, 5);
                    break;
                case 'ambient':
                default:
                    const ambientLight = new THREE.AmbientLight(dynamicLightColor, lightIntensity);
                    dynamicLight = ambientLight;
                    break;
            }

            dynamicLight.position.set(lightXPos, lightYPos, lightZPos);
            scene.add(dynamicLight);

            if(lightHelper && lightType != 'ambient') {
                scene.add(dynamicLightHelper);
            }
        }

        // load gltf
        function loadGLTF() {

            // valid string
            if (gltfURL) {
                const loader = new GLTFLoader();
                loader.load(gltfURL, (gltf) => {

                    mesh = gltf.scene;
                    scene.add(mesh);

                }, undefined, (error) => {

                    // fallback mesh
                    console.error('GLTF load error - falling back to cube.', error);
                    const fallbackGeometry = new THREE.BoxGeometry(1,1,1);
                    const fallbackMaterial = new THREE.MeshBasicMaterial({color:'red'});
                    mesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
                    scene.add(mesh);

                });
            } else {
                // warn user 
                console.warn('GLTF type specified but no URL provided - falling back to cube.');
                const fallbackGeometry = new THREE.BoxGeometry(1,1,1);
                const fallbackMaterial = new THREE.MeshBasicMaterial({color:'red'});
                mesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
                scene.add(mesh);
            }
        }

        // load 3d text
        function loadTextGeo() {
            
            const loader = new FontLoader();
            loader.load('https://raw.githubusercontent.com/callahan-codes/font/refs/heads/main/Open%20Sans%20Condensed_Bold.json', function (font) {
                const geometry = new TextGeometry(tridText, {
                    font: font,
                    size: tridTextSize * 0.5,
                    height: 0.05,
                    depth: 0.5
                });

                const material = new THREE.MeshStandardMaterial({ color: tridTextColor });
                const textMesh = new THREE.Mesh(geometry, material);
                geometry.center(); 
                textMesh.rotation.y = Math.PI / 2;
                scene.add(textMesh);
            });
        }

        // instancing mesh
        function buildInstancedMesh() {
            const dummyMesh = new THREE.Object3D();
            for (let i = 0; i < geometryInstancingNum; i++) {
                dummyMesh.position.x = Math.random() * geometryInstancingSpacing - geometryInstancingSpacing / 2;
                dummyMesh.position.y = Math.random() * geometryInstancingSpacing - geometryInstancingSpacing / 2;
                dummyMesh.position.z = Math.random() * geometryInstancingSpacing - geometryInstancingSpacing / 2;

                dummyMesh.updateMatrix();
                mesh.setMatrixAt(i, dummyMesh.matrix);
            }
        }

        // rotatation
        function rotateObject(rotationDir, rotationSpeed) {

            // axis
            switch(rotationDir) {
                case 'x':
                    mesh.rotation.x += (rotationSpeed * 0.01);
                    break;
                case 'y':
                    mesh.rotation.y += (rotationSpeed * 0.01);
                    break;
                case 'z':
                    mesh.rotation.z += (rotationSpeed * 0.01);
                    break;
                default:
                    break;
                
            }
        }

        // background
        function buildBackground() {

            if(background === "none") {
                controls.enabled = true;
            } else {
                controls.enabled = false;
            }

            // type
            switch(background) {
                case 'particles':
                    buildBackground_Particles();
                    break;
                case 'cubegrid':
                    buildBackground_Cubes();
                case 'none':
                default:
                    break;
            }
        }

        // background particles
        function buildBackground_Particles() {

            const positions = new Float32Array(particleAmount * 3);
            for (let i = 0; i < particleAmount * 3; i += 3) {
                positions[i] = -10; 
                positions[i + 1] = (Math.random() - 0.5) * (particleStretch * 2);
                positions[i + 2] = (Math.random() - 0.5) * (particleStretch * 2);
            }

            particlesGeo = new THREE.BufferGeometry();
            particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particlesMat = new THREE.PointsMaterial({ size: (particleSize * 0.1), color: particleColor });
            
            particles = new THREE.Points(particlesGeo, particlesMat);
            scene.add(particles);

        }

        // background cubes
        function buildBackground_Cubes() {
            const count = cubegridStretch * cubegridStretch;
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            let assignedMaterial;

            switch (cubegridMaterial) {
                case 'lambert':
                    assignedMaterial = new THREE.MeshLambertMaterial({ color: cubegridColor});
                    break;
                case 'basic':
                    assignedMaterial = new THREE.MeshBasicMaterial({ color: cubegridColor});
                    break;
                case 'standard':
                    assignedMaterial = new THREE.MeshStandardMaterial({ color: cubegridColor});
                    break;
                case 'physical':
                    assignedMaterial = new THREE.MeshPhysicalMaterial({ color: cubegridColor});
                    break;
                case 'phong':
                default:
                    assignedMaterial = new THREE.MeshPhongMaterial({ color: cubegridColor});
                    break;
            }
            
            cubegridInstance = new THREE.InstancedMesh(geometry, assignedMaterial, count);
            scene.add(cubegridInstance);

            const dummy = new THREE.Object3D();
            const halfSize = (cubegridStretch - 1) * 0.5 * cubegridSpacing;
            let index = 0;

            for (let i = 0; i < cubegridStretch; i++) {
                for (let j = 0; j < cubegridStretch; j++) {
                    const y = i * cubegridSpacing - halfSize;
                    const z = j * cubegridSpacing - halfSize;

                    dummy.position.set(-10, y, z);
                    dummy.updateMatrix();
                    cubegridInstance.setMatrixAt(index, dummy.matrix);

                    cubegridOffsets[index] = Math.random() * Math.PI * 2;
                    index++;
                }
            }

            cubegridInstance.instanceMatrix.needsUpdate = true;
        }

        // camera shake
        function updateCameraFollowMouse(camera, target = new THREE.Vector3(cameraXTarget, cameraYTarget, cameraZTarget), radius = 5) {
            const angleHorizontal = mouse.x * (Math.PI / 3) * 0.1;        
            const angleVertical = mouse.y * (Math.PI / 3) * 0.1; 

            camera.position.x = target.x + radius * Math.cos(angleHorizontal) * Math.cos(angleVertical);
            camera.position.y = target.y + radius * Math.sin(angleVertical);
            camera.position.z = target.z + radius * Math.sin(angleHorizontal) * Math.cos(angleVertical);

            camera.lookAt(target);
        }

    });
});
