const budo = require('budo');
const browserify = require('browserify');
const path = require('path');

// root source
const entry = require.resolve('../');

// You could add more transforms here if you like
const transforms = [
  'babelify',
  'glslify'
];

// during development
module.exports.dev = function () {
  const args = [ entry ].concat(process.argv.slice(2));
  const app = budo.cli(args, {
    dir: path.resolve(__dirname, '../app'),
    serve: 'bundle.js',
    live: true,
    browserify: {
      transform: transforms.concat([ 'shader-reload/transform' ])
    }
  });
  return app;
};

// create a file for production
module.exports.bundle = function () {
  const bundler = browserify(entry, {
    fullPaths: process.env.DISC === '1'
  });

  // add common transforms
  transforms.forEach(t => bundler.transform(t));

  // add production transforms
  return bundler
    .transform('loose-envify', { global: true })
    .transform('unreachable-branch-transform', { global: true })
    .bundle();
};

if (!module.parent) {
  if (process.env.NODE_ENV === 'production') {
    module.exports.bundle().pipe(process.stdout);
  } else {
    module.exports.dev();
  }
}
