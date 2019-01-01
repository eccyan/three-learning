import * as THREE from 'three';
import * as CANNON from 'cannon';
import { gui, webgl, assets } from '../../context';

module.exports = class Sphere extends THREE.Object3D {

  constructor () {
    super();

    const rad = 0.5;
    const geometry = new THREE.SphereGeometry(rad, 32, 32);
    const material = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness: 0.2, emissive: 0x6699FF, emissiveIntensity: 0.8});
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0, 100, 0);
    mesh.castShadow = true;

    this.add(mesh);
    this.mesh = mesh;

    const mass = 1;
    const shape = new CANNON.Sphere(rad);
    const body = new CANNON.Body({mass, shape});
    body.position.copy(mesh.position);

    this.body = body;
  }

  update(dt, time) {
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);
  }
}
