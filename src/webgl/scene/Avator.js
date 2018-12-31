import * as THREE from 'three';
import { gui, webgl, assets } from '../../context';
import Camera from './Camera';

module.exports = class Avator extends THREE.Object3D {

  constructor () {
    super();

    this.add(new Camera());
  }
}
