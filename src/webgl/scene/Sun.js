import { gui, webgl, assets, workbench } from '../../context';

const update = (instance, items) => {
  instance.light.color.setStyle(items.color);
};

@workbench(update)
export default class Sun extends THREE.Object3D {
  settings = {
    color: { value: 'rgb(255, 255, 255)', isColor: true },
  }

  constructor () {
    super();

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

      light.shadow.camera.far = 3500;
      light.shadow.bias = -0.0001;
      light.shadow.darkness = 0.35;

      this.add(light);
      this.light = light;

      this.fog = new THREE.Fog(0x222233, 0, 20000);
    }

    /*
    if (gui) {
      const folder = gui.addFolder(this.constructor.name);
      const settings = {
        color: this.light.color.getStyle(),
      };
      folder.addColor(settings, 'color').onChange(update);
      folder.open();
    }
    */
  }
}
