import { gui, webgl, assets } from '../../context';

module.exports = class Skybox extends THREE.Object3D {

  constructor () {
    super();

    // Skybox
	const width = 100;
	const height = 100;
	const depth = 100;
    const geometry = new THREE.BoxGeometry( width, height, depth);

    const loader = new THREE.TGALoader();
    const materials = [
      new THREE.MeshBasicMaterial( { map: loader.load("assets/images/purplenebula-xpos.tga"), side: THREE.BackSide } ),
      new THREE.MeshBasicMaterial( { map: loader.load("assets/images/purplenebula-xneg.tga"), side: THREE.BackSide } ),
      new THREE.MeshBasicMaterial( { map: loader.load("assets/images/purplenebula-ypos.tga"), side: THREE.BackSide } ),
      new THREE.MeshBasicMaterial( { map: loader.load("assets/images/purplenebula-yneg.tga"), side: THREE.BackSide } ),
      new THREE.MeshBasicMaterial( { map: loader.load("assets/images/purplenebula-zpos.tga"), side: THREE.BackSide } ),
      new THREE.MeshBasicMaterial( { map: loader.load("assets/images/purplenebula-zneg.tga"), side: THREE.BackSide } ),
    ];

    const skybox = new THREE.Mesh( geometry, materials );
    skybox.applyMatrix (new THREE.Matrix4().makeTranslation(0, 0, 0));

    this.add(skybox);
  }
}
