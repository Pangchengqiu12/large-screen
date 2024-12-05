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
const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};
function resize(container, camera, renderer, _that) {
  setSize(container, camera, renderer);
  _that.onResize();
}
const dbResize = _.debounce(resize, 300);

class Resizer {
  constructor(container, camera, renderer) {
    // set initial size on load
    const _that = this;
    window.addEventListener('resize', () => {
      dbResize(container, camera, renderer, _that);
    });
  }
  onResize() {}
}

export { Resizer };
