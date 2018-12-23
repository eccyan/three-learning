import WebGLApp from './webgl/WebGLApp';
import AssetManager from './util/AssetManager';
import query from './util/query';
import dat from 'dat.gui';
import workbench from './util/workbench.js';

// Setup dat.gui
const gui = new dat.GUI();

if (!query.gui) {
  document.querySelector('.dg.ac').style.display = 'none';
}

// Grab our canvas
const canvas = document.querySelector('.main-canvas');

// Setup the WebGLRenderer
const webgl = new WebGLApp({
  canvas
});

// Setup an asset manager
const assets = new AssetManager({
  renderer: webgl.renderer
});

export {
  assets,
  canvas,
  webgl,
  gui,
  workbench,
};
