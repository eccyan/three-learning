import * as THREE from 'three';
import * as CANNON from 'cannon';
import SimplexNoise from 'simplex-noise';
import { gui, webgl, assets } from '../../context';

module.exports = class Floor extends THREE.Object3D {

  constructor () {
    super();

    const geometry = new THREE.PlaneGeometry(100, 100, 16, 16);
    const map = new THREE.TextureLoader().load("assets/images/sand.jpg");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(16, 16);
    const normalMap = new THREE.TextureLoader().load("assets/images/sand_n.jpg");
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(16, 16);
    const material = new THREE.MeshStandardMaterial({map: map, normalMap: normalMap, side: THREE.DoubleSide, metalness: 0});
    const mesh = new THREE.Mesh(geometry, material);

    const noise = new SimplexNoise();
    for (let i = 0; i < geometry.vertices.length; i++) {
      const vertex = geometry.vertices[i];
      vertex.z = noise.noise2D(vertex.x / 8, vertex.y / 8) * 2;
    }

    mesh.position.y = -5;
    mesh.rotation.x = Math.PI / 2;
    mesh.receiveShadow = true;

    this.add(mesh);
    this.mesh = mesh;

    const mass = 0;
    const shape = new CANNON.Plane();

    const body = new CANNON.Body({mass, shape});
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    body.position.copy(mesh.position);
    body.position.x -= 0.5;
    this.body = body;
  }
}
