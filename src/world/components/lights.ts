import { DirectionalLight, AmbientLight, HemisphereLight } from 'three';
/**
 * @description 创建光照
 */
function createLights() {
  // const ambientLight = new AmbientLight('white', 2);
  const ambientLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    5 // intensity
  );
  const light = new DirectionalLight('white', 8); // TODO
  // move the light right, up, and towards us
  light.position.set(10, 10, 10);

  return { light, ambientLight };
}

export { createLights };
