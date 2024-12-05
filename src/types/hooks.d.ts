import * as THREE from 'three';
export interface ThreeType {
  renderer: InstanceType<typeof THREE.WebGLRenderer> | null;
  camera: InstanceType<typeof THREE.PerspectiveCamera> | null;
  scene: nuInstanceType<typeof THREE.Scene> | null;
}
