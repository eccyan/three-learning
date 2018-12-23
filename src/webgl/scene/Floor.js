import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';
import { gui, webgl, assets } from '../../context';

module.exports = class Floor extends THREE.Object3D {

  constructor () {
    super();

    const geometry = new THREE.PlaneGeometry(100, 100, 32, 32);
    const map = new THREE.TextureLoader().load("assets/images/sand.jpg");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(16, 16);
    const normalMap = new THREE.TextureLoader().load("assets/images/sand_n.jpg");
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(16, 16);
    const material = new THREE.MeshStandardMaterial({map: map, normalMap: normalMap, side: THREE.DoubleSide, metalness: 0});
    const floor = new THREE.Mesh(geometry, material);

    const noise = new SimplexNoise();
    for (let i = 0; i < geometry.vertices.length; i++) {
      var vertex = geometry.vertices[i];
      vertex.z = noise.noise2D(vertex.x / 8, vertex.y / 8);
    }

    floor.position.y = -5;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;

    this.add(floor);
  }
}
