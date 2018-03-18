'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Rollup = require('broccoli-rollup');
const BabelTranspiler = require('broccoli-babel-transpiler');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');


module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  let rollupTree = new Rollup('node_modules/inversify', {
    rollup: {
      input: 'lib/inversify.js',
      plugins: [
        resolve(),
        commonjs(),
      ],
      output: {
        file: 'inversify.js',
        format: 'es',
      }
    }
  });

  const babel = app.project.findAddonByName('ember-cli-babel');
  const babelOptions = babel.buildBabelOptions();

  let tree = new BabelTranspiler(rollupTree, babelOptions);

  return app.toTree(tree);
};
