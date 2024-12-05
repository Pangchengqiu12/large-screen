import { PerspectiveCamera } from 'three';
/**
 * ## 创建相机
 */
function createCamera() {
  /*
  fov，或视野：相机的视野有多宽，以度为单位。
  aspect，或纵横比：场景的宽度与高度的比率。
  near, 或近剪裁平面：任何比这更靠近相机的东西都是不可见的。
  far，或远剪裁平面：任何比这更远离相机的东西都是不可见的。
  */
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    4 / 3, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100 // far clipping plane
  );
  camera.position.set(0, 0, 10);
  return camera;
}

export { createCamera };
