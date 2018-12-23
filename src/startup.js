import * as THREE from 'three';
import { assets, webgl, gui } from './context';
import Arena from './webgl/scene/Arena';

export default () => {
  // Set background color
  const background = 'black';
  document.body.style.background = background;
  webgl.renderer.setClearColor(background);

  // Hide canvas
  webgl.canvas.style.visibility = 'hidden';

  // Preload any queued assets
  assets.loadQueued(() => {
    console.log('Done loading');

    // Show canvas
    webgl.canvas.style.visibility = '';

    // To avoid page pulling and such
    webgl.canvas.addEventListener('touchstart', ev => ev.preventDefault());

    // Add any "WebGL components" here...
    webgl.renderer.shadowMap.enabled = true;

    webgl.scene.add(new Arena());

    {
      const axes = new THREE.AxesHelper(10);
      axes.position.set(0, 0, 0);
      webgl.scene.add(axes);
    }

    // start animation loop
    webgl.start();
    webgl.draw();
  });
};
