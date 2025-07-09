// Core
import * as THREE from 'three';

// Controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

// Loaders
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Post-processing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';

// Shaders
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';

// Geometry & Helpers
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';

import { GridHelper } from 'three/src/helpers/GridHelper.js';
import { AxesHelper } from 'three/src/helpers/AxesHelper.js';
import { CameraHelper } from 'three/src/helpers/CameraHelper.js';
import { DirectionalLightHelper } from 'three/src/helpers/DirectionalLightHelper.js';

// Animation
import { AnimationMixer } from 'three/src/animation/AnimationMixer.js';

// GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

window.MyThreeBundle = {
    THREE,
    OrbitControls, FlyControls, FirstPersonControls, PointerLockControls, TrackballControls,
    GLTFLoader, OBJLoader, TextureLoader, CubeTextureLoader, DRACOLoader, RGBELoader,
    EffectComposer, RenderPass, UnrealBloomPass, ShaderPass, SSAOPass,
    FXAAShader, CopyShader, LuminosityShader, SobelOperatorShader,
    BoxLineGeometry, ConvexGeometry, ParametricGeometry, TeapotGeometry,
    GridHelper, AxesHelper, CameraHelper, DirectionalLightHelper,
    AnimationMixer, GUI
};


console.log('called');