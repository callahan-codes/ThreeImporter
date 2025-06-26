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

        // geometry instancing attributes
        const geometryInstancing = container.getAttribute('data-geometry-instancing') === 'true';
        const geometryInstancingNum = parseInt(container.getAttribute('data-geometry-instancingNum'), 10) || 50;
        const geometryInstancingSpacing = parseInt(container.getAttribute('data-geometry-instancingSpacing'), 10) || 1;

        // light attributes
        const lightType = container.getAttribute('data-light') || 'ambient';
        const lightColor = container.getAttribute('data-light-color') || '#FFFFFF';
        const lightIntensity = parseInt(container.getAttribute('data-light-intensity'), 10) || 1;
        const lightXPos = parseInt(container.getAttribute('data-light-xpos'), 10) || 1;
        const lightYPos = parseInt(container.getAttribute('data-light-ypos'), 10) || 1;
        const lightZPos = parseInt(container.getAttribute('data-light-zpos'), 10) || 1;

        // camera attributes
        const cameraXPos = parseInt(container.getAttribute('data-camera-xpos'), 10) || 5;
        const cameraYPos = parseInt(container.getAttribute('data-camera-ypos'), 10) || 0;
        const cameraZPos = parseInt(container.getAttribute('data-camera-zpos'), 10) || 0;

        // rotation attributes
        const geometryXRotation = parseInt(container.getAttribute('data-geometry-xrotation'), 10) || 0;
        const geometryYRotation = parseInt(container.getAttribute('data-geometry-yrotation'), 10) || 0;
        const geometryZRotation = parseInt(container.getAttribute('data-geometry-zrotation'), 10) || 0;

        // background attributes
        const background = container.getAttribute('data-background') || 'none';
        const particleAmount = parseInt(container.getAttribute('data-particle-amount'), 10) || 1000;
        const particleSize = parseInt(container.getAttribute('data-particle-size'), 10) || 1;
        const particleSpeed = parseInt(container.getAttribute('data-particle-speed'), 10) || 5;
        const particleDirection = container.getAttribute('data-particle-direction') || 'right';
        const particleColor = container.getAttribute('data-particle-color') || '#000000';
        const particleStretch = parseInt(container.getAttribute('data-particle-stretch'), 10) || 5;

        // other variables
        let mesh,
            particles,
            particlesGeo,
            particlesMat;

        // threejs scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 5000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        camera.position.set(cameraXPos, cameraYPos, cameraZPos);

        // mesh setup
        buildMesh(geometryType, geometryMaterial, geometrySize, geometryColor);

        // light setup
        buildLight(lightType, lightColor, lightIntensity);

        // background
        buildBackground();

        // threejs main animation loop
        function animate(){
            requestAnimationFrame(animate);

            // rotate mesh
            if(geometryXRotation != 0) rotateObject('x', geometryXRotation);
            if(geometryYRotation != 0) rotateObject('y', geometryYRotation);
            if(geometryZRotation != 0) rotateObject('z', geometryZRotation);

            // backgrounds
            if(background === 'particles') {

                // access particle positions
                const positions = particlesGeo.attributes.position.array;
                for (let i = 0; i < particleAmount; i += 3) {

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

        // build mesh function
        function buildMesh(type, material, size, color) {

            if(type === 'gltf'){
                loadGLTF();
            } else {
                let assignedMaterial, assignedGeometry;

                // geometry material selection
                switch (material) {
                    case 'lambert':
                        assignedMaterial = new THREE.MeshLambertMaterial({ color: color });
                        break;
                    case 'phong':
                        assignedMaterial = new THREE.MeshPhongMaterial({ color: color });
                        break;
                    case 'standard':
                        assignedMaterial = new THREE.MeshStandardMaterial({ color: color });
                        break;
                    case 'physical':
                        assignedMaterial = new THREE.MeshPhysicalMaterial({ color: color });
                        break;
                    case 'basic':
                    default:
                        assignedMaterial = new THREE.MeshBasicMaterial({ color: color });
                        break;
                }

                // geometry type selection
                switch(type){
                    case 'torusknot':
                        assignedGeometry = new THREE.TorusKnotGeometry(size, size * 0.33, 100, 16);
                        break;
                    case 'tetrahedron':
                        assignedGeometry = new THREE.TetrahedronGeometry(size, 0);
                        break;
                    case 'sphere':
                        assignedGeometry = new THREE.SphereGeometry(size, 64, 32);
                        break;
                    case 'ring':
                        assignedGeometry = new THREE.RingGeometry(size, size * 5, 32);
                        break;
                    case 'plane':
                        assignedGeometry = new THREE.PlaneGeometry(size, size);
                        break;
                    case 'octahedron':
                        assignedGeometry = new THREE.OctahedronGeometry(size, 0);
                        break;
                    case 'icosahedron':
                        assignedGeometry = new THREE.IcosahedronGeometry(size, 0);
                        break;
                    case 'dodecahedron':
                        assignedGeometry = new THREE.DodecahedronGeometry(size, 0);
                        break;
                    case 'cylinder':
                        assignedGeometry = new THREE.CylinderGeometry(size, size, 20, 32);
                        break;
                    case 'cone':
                        assignedGeometry = new THREE.ConeGeometry(size, size*4, 32);
                        break;
                    case 'circle':
                        assignedGeometry = new THREE.CircleGeometry(size, 32);
                        break;
                    case 'capsule':
                        assignedGeometry = new THREE.CapsuleGeometry(size, size, 4, 8);
                        break;
                    case 'torus':
                        assignedGeometry = new THREE.TorusGeometry(size, size / 50, 16, 100);
                        break;
                    case 'box':
                        assignedGeometry = new THREE.BoxGeometry(size, size, size);
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
        function buildLight(type, color, intensity) {

            let dynamicLight;
            const dynamicLightColor = new THREE.Color(color);

            switch (type){
                case 'directional':
                    const directionalLight = new THREE.DirectionalLight(dynamicLightColor, intensity);
                    dynamicLight = directionalLight;
                    break;
                case 'hemisphere':
                    const hemiLight = new THREE.HemisphereLight(dynamicLightColor, intensity);
                    dynamicLight = hemiLight;
                    break;
                case 'point':
                    const pointLight = new THREE.PointLight(dynamicLightColor, intensity, 100);
                    dynamicLight = pointLight;
                    break;
                case 'spotlight':
                    const spotLight = new THREE.SpotLight(dynamicLightColor, intensity);
                    dynamicLight = spotLight;
                    break;
                case 'ambient':
                default:
                    const ambientLight = new THREE.AmbientLight(dynamicLightColor, intensity);
                    dynamicLight = ambientLight;
                    break;
            }

            dynamicLight.position.set(lightXPos, lightYPos, lightZPos);
            scene.add(dynamicLight);
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

            // type
            switch(background) {
                case 'particles':
                    buildBackground_Particles();
                    break;
                case 'none':
                default:
                    break;
            }
        }

        // background particles
        function buildBackground_Particles() {

            const positions = new Float32Array(particleAmount);
            for (let i = 0; i < particleAmount; i += 3) {
                positions[i] = -5; 
                positions[i + 1] = (Math.random() - 0.5) * particleStretch;
                positions[i + 2] = (Math.random() - 0.5) * particleStretch;
            }

            particlesGeo = new THREE.BufferGeometry();
            particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particlesMat = new THREE.PointsMaterial({ size: (particleSize * 0.1), color: particleColor });
            
            particles = new THREE.Points(particlesGeo, particlesMat);
            scene.add(particles);

        }

        // controls
        function controlsToggle() {
            
        }

    });
});
