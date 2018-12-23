import Honeycomb from './webgl/scene/Honeycomb';
import Camera from './webgl/scene/Camera';
import Skybox from './webgl/scene/Skybox';
import Sun from './webgl/scene/Sun';
import Floor from './webgl/scene/Floor';
import Sphere from './webgl/scene/Sphere';
import { assets, webgl, gui } from './context';

module.exports = function () {
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

    webgl.scene.add(new Sun());
    webgl.scene.add(new Floor());
    webgl.scene.add(new Skybox());
    webgl.scene.add(new Sphere());
    webgl.scene.add(new Camera());

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
