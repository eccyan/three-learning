import * as THREE from 'three';
import * as CANNON from 'cannon';
import { gui, webgl, assets } from '../../context';
import Avator from './Avator';
import Floor from './Floor';
import Skybox from './Skybox';
import Sun from './Sun';
import Sphere from './Sphere';

export default class Arena extends THREE.Object3D {

  constructor () {
    super();

    const floor = new Floor();
    this.add(new Sun());
    this.add(floor);
    this.add(new Skybox());
    this.add(new Sphere());
    this.add(new Avator({floor: floor}));

    const world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 8;
    world.solver.tolerance = 0.1;
    this.world = world;

    this.traverse(obj => {
      if (obj.hasOwnProperty('body')) {
        this.world.add(obj.body);
      }
    });
  }

  update (dt, time) {
    this.world.step(dt);
  }
}
