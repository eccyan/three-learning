import * as THREE from 'three';
import * as CANNON from 'cannon';
import { gui, webgl, assets } from '../../context';
import Camera from './Camera';

module.exports = class Avator extends THREE.Object3D {

  constructor ({floor}) {
    super();

    const mat = new THREE.MeshPhongMaterial({color: 'blue'});
    mat.transparent = true;
    mat.opacity = 0.0;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry (2, 5, 2), mat);
    mesh.castShadow = true;
    mesh.position.set(20, 10, 20);
    this.add(mesh);
    this.material = mat;
    this.mesh = mesh;

    const camera = webgl.camera;
    camera.position.copy(mesh.position);
    this.camera = camera;

    const mass = 2;
    const shape = new CANNON.Box(new CANNON.Vec3(2, 5, 2));
    const body = new CANNON.Body({mass, shape});
    body.position.copy(mesh.position);
    this.body = body;

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));

    floor.body.addEventListener('collide', this.onColliedWithFloor.bind(this));
  }

  update (dt, time) {
    this.camera.position.y = this.body.position.y;
    this.body.position.copy(this.camera.position);
    this.body.quaternion.copy(this.camera.quaternion);

    this.mesh.position.copy(this.camera.position);
    this.mesh.quaternion.copy(this.camera.quaternion);
  }

  onKeyDown (event) {
    switch (event.keyCode) {
      case 32:
        this.jump();
        break;
    }
  }

  onKeyUp (event) {
  }

  onColliedWithFloor (event) {
    if (event.body === this.body) {
      this.isJumping = false;
    }
  }

  jump () {
    if (this.isJumping) return;

    this.body.velocity.y = 10;
    this.isJumping = true;
  }
}
