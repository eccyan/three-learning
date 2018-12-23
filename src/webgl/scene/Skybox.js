import { gui, webgl, assets } from '../../context';

const width = 100;
const height = 100;
const depth = 100;
const mapURLs = [
  'assets/images/purplenebula-xpos.tga',
  'assets/images/purplenebula-xneg.tga',
  'assets/images/purplenebula-ypos.tga',
  'assets/images/purplenebula-yneg.tga',
  'assets/images/purplenebula-zpos.tga',
  'assets/images/purplenebula-zneg.tga',
];

module.exports = class Skybox extends THREE.Object3D {

  constructor () {
    super();

    const geometry = new THREE.BoxGeometry( width, height, depth);

    const loader = new THREE.TGALoader();
    const materials = mapURLs.map((url) => {
      return new THREE.MeshBasicMaterial( { map: loader.load(url), side: THREE.BackSide } )
    });

    const skybox = new THREE.Mesh( geometry, materials );
    skybox.applyMatrix (new THREE.Matrix4().makeTranslation(0, 0, 0));

    this.add(skybox);
  }
}
