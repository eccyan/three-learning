import { gui, webgl, assets } from '../../context';

module.exports = class Sun extends THREE.Object3D {

  constructor () {
    super();

    {
      const geometry = new THREE.SphereGeometry(1, 8, 8);
      const material = new THREE.MeshBasicMaterial({color: 0xfffffff});
      const sphere = new THREE.Mesh(geometry, material);
      sphere.visible = false;
      sphere.position.set(-50, 40, 0);
      this.add(sphere);
    }

    {
      const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
      light.position.set(-50, 40, 0 );
      light.color.setHSL(0.6, 0.75, 0.5);
      light.groundColor.setHSL(0.095, 0.5, 0.5);
      this.add(light);
    }

    {
      const light = new THREE.DirectionalLight(0xffffff, 1.8);
      light.color.setHSL( 0.1, 1, 0.95 );
      light.position.set(-50, 40, 0 );
      light.position.multiplyScalar( 50 );
      light.castShadow = true;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;

      const d = 16;

      light.shadow.camera.left = -d;
      light.shadow.camera.right = d;
      light.shadow.camera.top = d;
      light.shadow.camera.bottom = -d;

      light.shadow.camera.far = 3500;
      light.shadow.bias = -0.0001;
      light.shadow.darkness = 0.35;

      this.add(light);

      this.fog = new THREE.Fog(0x222233, 0, 20000);
    }
  }
}
