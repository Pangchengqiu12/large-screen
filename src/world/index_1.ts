// import { createCamera } from './components/camera.js';
// import { createCube } from './components/cube.js';
// import { createScene } from './components/scene.js';
// import { createLights } from './components/lights.js';
// import { createRenderer } from './systems/renderer.js';
// import { Resizer } from './systems/resizer.js';
// let camera;
// let renderer;
// let scene;
// import {
//   PerspectiveCamera,
//   BoxGeometry,
//   Mesh,
//   MeshStandardMaterial,
//   Scene,
//   Color,
//   WebGLRenderer,
//   DirectionalLight,
// } from 'three';
// class World {
//   camera;
//   renderer;
//   scene;
//   cube;
//   light;
//   container;
//   // 1. Create an instance of the World app
//   constructor(container) {
//     this.container = container;
//     this.#createScene();
//     this.#createCamera();
//     this.#createCube();
//     this.#createLights();
//     this.#createRenderer();
//     // 2. Render the scene
//     this.scene.add(this.cube, this.light);

//     // const resizer = new Resizer(container, this.camera, this.renderer);
//   }
//   render() {
//     this.container.append(this.renderer.domElement);
//     // draw a single frame
//     this.renderer.render(this.scene, this.camera);
//   }
//   #createCamera() {
//     this.camera = new PerspectiveCamera(
//       35, // fov = Field Of View
//       this.container.clientWidth / this.container.clientHeight, // aspect ratio (dummy value)
//       0.1, // near clipping plane
//       100, // far clipping plane
//     );
//     this.camera.position.set(0, 0, 10);
//   }
//   #createCube() {
//     this.cube = new Mesh(
//       new BoxGeometry(1, 1, 1),
//       new MeshStandardMaterial({
//         color: 'purple',
//       }),
//     );
//     this.cube.rotation.set(-0.5, -0.1, 0.8);
//   }
//   #createScene() {
//     this.scene = new Scene();
//     this.scene.background = new Color('skyblue');
//   }
//   #createRenderer() {
//     this.renderer = new WebGLRenderer();
//     /*启用物理上正确的光照*/
//     this.renderer.physicallyCorrectLights = true;
//   }
//   #createLights() {
//     this.light = new DirectionalLight('white', 8); // TODO
//     // move the light right, up, and towards us
//     this.light.position.set(10, 10, 10);
//   }
// }

// export { World };
import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';
import { Loop } from './systems/Loop.js';
import { createControls } from './systems/controls.js';
// let camera;
// let renderer;
// let scene;
/**
 * @class World
 * @description Create an instance of the World app
 * @param {object} 容器对象
 * @method render 渲染
 * @method start 动画启动
 * @method stop 动画停止
 */
class World {
  camera;
  scene;
  renderer;
  loop;
  cube;
  ambientLight;
  light;
  // 1. Create an instance of the World app
  constructor(container: HTMLElement) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer(container, this.scene, this.camera);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    // 2. Render the scene
    container.append(this.renderer.domElement);

    const controls = createControls(this.camera, this.renderer.domElement);
    // controls.target.set(1, 2, 3);

    this.cube = createCube();
    controls.target.copy(this.cube.position);
    this.ambientLight = createLights().ambientLight;
    this.light = createLights().light;
    this.loop.updatables.push(controls);
    this.scene.add(this.cube, this.ambientLight);
    const resizer = new Resizer(container, this.camera, this.renderer);
    controls.addEventListener('change', () => {
      this.render();
    });
    resizer.onResize = () => {
      this.render();
    };
  }
  render() {
    // draw a single frame
    this.renderer.render(this.scene, this.camera);
  }
  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
