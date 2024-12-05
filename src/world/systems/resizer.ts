// class Resizer {
//   constructor(container, camera, renderer) {
//     // Set the camera's aspect ratio
//     camera.aspect = container.clientWidth / container.clientHeight;

//     // update the camera's frustum
//     camera.updateProjectionMatrix();

//     // update the size of the renderer AND the canvas
//     renderer.setSize(container.clientWidth, container.clientHeight);

//     // set the pixel ratio (for mobile devices)
//     renderer.setPixelRatio(window.devicePixelRatio);
//   }
// }
// export { Resizer };
import _ from 'lodash';
import { WebGLRenderer, PerspectiveCamera } from 'three';
const setSize = (
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};
function resize(
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  _that: any
) {
  setSize(container, camera, renderer);
  _that.onResize();
}
const dbResize = _.debounce(resize, 300);

class Resizer {
  constructor(
    container: HTMLElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    // set initial size on load
    const _that = this;
    window.addEventListener('resize', () => {
      dbResize(container, camera, renderer, _that);
    });
  }
  onResize() {}
}

export { Resizer };
