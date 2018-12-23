import * as THREE from 'three';
import { gui, webgl, assets } from '../../context';

module.exports = class Sphere extends THREE.Object3D {

  constructor () {
    super();

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness: 0.2, emissive: 0x6699FF, emissiveIntensity: 0.8});
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(-1, -2.5, 0);
    sphere.castShadow = true;

    this.add(sphere);
  }
}
