import * as THREE from 'three';
import { gui, webgl, assets } from '../../context';
import Camera from './Camera';

module.exports = class Avator extends THREE.Object3D {

  constructor () {
    super();

    const mat = new THREE.MeshPhongMaterial({color: 'blue'});
    mat.transparent = true;
    mat.opacity = 0.0;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry (2, 2, 2), mat);
    mesh.castShadow = true;
    this.add(mesh);

    this.material = mat;
    this.mesh = mesh;
    this.camera = webgl.camera;
  }

  update (dt, time) {
    this.mesh.position.copy(this.camera.position);
  }
}
