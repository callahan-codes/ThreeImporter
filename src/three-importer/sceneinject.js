// controls
import * as THREE from 'three';
window.THREE = THREE;
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

// loaders
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// post-processing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';

// shaders
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';

// geometry & helpers
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';

import { GridHelper } from 'three/src/helpers/GridHelper.js';
import { AxesHelper } from 'three/src/helpers/AxesHelper.js';
import { CameraHelper } from 'three/src/helpers/CameraHelper.js';
import { DirectionalLightHelper } from 'three/src/helpers/DirectionalLightHelper.js';

// animation
import { AnimationMixer } from 'three/src/animation/AnimationMixer.js';

// gui
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// modules mapping
const moduleMap = {
    orbitcontrols: OrbitControls,
    flycontrols: FlyControls,
    firstpersoncontrols: FirstPersonControls,
    pointerlockcontrols: PointerLockControls,
    trackballcontrols: TrackballControls,

    gltfloader: GLTFLoader,
    objloader: OBJLoader,
    fbxloader: FBXLoader,
    textureloader: TextureLoader,
    cubetextureloader: CubeTextureLoader,
    dracoloader: DRACOLoader,
    rgbeloader: RGBELoader,

    effectcomposer: EffectComposer,
    renderpass: RenderPass,
    unrealbloompass: UnrealBloomPass,
    shaderpass: ShaderPass,
    ssaopass: SSAOPass,

    fxaashader: FXAAShader,
    copyshader: CopyShader,
    luminosityshader: LuminosityShader,
    sobeloperatorshader: SobelOperatorShader,

    boxlinegeometry: BoxLineGeometry,
    convexgeometry: ConvexGeometry,
    parametricgeometry: ParametricGeometry,
    teapotgeometry: TeapotGeometry,

    gridhelper: GridHelper,
    axeshelper: AxesHelper,
    camerahelper: CameraHelper,
    directionallighthelper: DirectionalLightHelper,

    animationmixer: AnimationMixer,
    gui: GUI
};

// name mapping for correct global keys
const nameMap = {
    orbitcontrols: 'OrbitControls',
    flycontrols: 'FlyControls',
    firstpersoncontrols: 'FirstPersonControls',
    pointerlockcontrols: 'PointerLockControls',
    trackballcontrols: 'TrackballControls',

    gltfloader: 'GLTFLoader',
    objloader: 'OBJLoader',
    fbxloader: 'FBXLoader',
    textureloader: 'TextureLoader',
    cubetextureloader: 'CubeTextureLoader',
    dracoloader: 'DRACOLoader',
    rgbeloader: 'RGBELoader',

    effectcomposer: 'EffectComposer',
    renderpass: 'RenderPass',
    unrealbloompass: 'UnrealBloomPass',
    shaderpass: 'ShaderPass',
    ssaopass: 'SSAOPass',

    fxaashader: 'FXAAShader',
    copyshader: 'CopyShader',
    luminosityshader: 'LuminosityShader',
    sobeloperatorshader: 'SobelOperatorShader',

    boxlinegeometry: 'BoxLineGeometry',
    convexgeometry: 'ConvexGeometry',
    parametricgeometry: 'ParametricGeometry',
    teapotgeometry: 'TeapotGeometry',

    gridhelper: 'GridHelper',
    axeshelper: 'AxesHelper',
    camerahelper: 'CameraHelper',
    directionallighthelper: 'DirectionalLightHelper',

    animationmixer: 'AnimationMixer',
    gui: 'GUI'
};

// auto-expose requested modules to global three or window
document.addEventListener('DOMContentLoaded', () => {
  if (window.sceneinject_modules && Array.isArray(window.sceneinject_modules)) {
    for (const mod of window.sceneinject_modules) {
      const key = mod.toLowerCase();
      const instance = moduleMap[key];
      const className = nameMap[key];

      if (instance && className) {
        if (typeof window.THREE !== 'undefined') {
          
          // check if the property exists on THREE and is not the imported instance itself
          if (window.THREE[className] && window.THREE[className] !== instance) {
            
            // skip re-assignment if it's already there to avoid the TypeError.
            console.warn(`THREE.${className} already exists and will not be overwritten by threeimporter.`);
            continue;
          }

          // only assign if it doesn't exist or is different.
          window.THREE[className] = instance;
          
        } else {
          window[className] = instance;
        }
      }
    }
  }

  console.log('three.js modules loaded:', window.sceneinject_modules);

  // dispatch event that modules are ready
  document.dispatchEvent(new Event('three-modules-ready'));
});
