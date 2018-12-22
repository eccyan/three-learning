const Honeycomb = require('./webgl/scene/Honeycomb');
const Camera = require('./webgl/scene/Camera');
const Skybox = require('./webgl/scene/Skybox');
const Sun = require('./webgl/scene/Sun');
const Floor = require('./webgl/scene/Floor');
const Sphere = require('./webgl/scene/Sphere');

const { assets, webgl, gui } = require('./context');

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
