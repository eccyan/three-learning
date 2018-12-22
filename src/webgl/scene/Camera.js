import { gui, webgl, assets } from '../../context';

module.exports = class Camera extends THREE.Object3D {

  constructor () {
    super();

    const angle = 75;
    const aspect = webgl.width / webgl.height;
    const near = 0.1;
    const far = 20000;

    const camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
    camera.position.set(0, 0, 0);

    this.add(camera);
  }
}
