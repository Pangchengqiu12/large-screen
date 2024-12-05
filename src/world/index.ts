import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
class World {
  // 1. Create an instance of the World app
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer(container);
    // 2. Render the scene
    container.append(renderer.domElement);
    const cube = createCube();
    const light = createLights();

    scene.add(cube, light.light, light.ambientLight);
    // const resizer = new Resizer(container, camera, renderer);
  }
  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
}

export { World };
