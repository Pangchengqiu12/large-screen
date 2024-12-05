import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from 'three';
/**
 * ## 创建立方体
 */
function createCube() {
  const material = createMaterial();
  const cube = new Mesh(new BoxGeometry(1, 1, 1), material);
  cube.rotation.set(-0.5, -0.1, 0.8);
  /*30度转换为弧度*/
  const radiansPerSecond = MathUtils.degToRad(30);
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };
  return cube;
}
/*创建纹理*/
function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('src/assets/textures/uv-test-bw.jpg');
  // create a "standard" material using
  const material = new MeshStandardMaterial({ map: texture });

  return material;
}
export { createCube };
