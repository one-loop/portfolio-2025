// Named imports only, so webpack can still tree-shake three.js.
// Loading `import('three')` directly would pull in the whole namespace and
// make the home page's bundle (which shares the three chunk) heavier.
export {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  OrthographicCamera,
  Vector2,
  Vector3,
  Spherical,
  TOUCH,
  TextureLoader,
  ShaderMaterial,
  Color,
  PlaneGeometry,
  Mesh,
} from 'three';
export { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
export { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
