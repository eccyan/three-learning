import * as THREE from 'three';
import { gui, webgl, assets } from '../../context';
import Camera from './Camera';
import Floor from './Floor';
import Skybox from './Skybox';
import Sun from './Sun';
import Sphere from './Sphere';

export default class Arena extends THREE.Object3D {

  constructor () {
    super();

    this.add(new Sun());
    this.add(new Floor());
    this.add(new Skybox());
    this.add(new Sphere());
    this.add(new Camera());
  }
}
