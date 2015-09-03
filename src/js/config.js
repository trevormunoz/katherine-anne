/* global require */

require.config({
  baseUrl: '../../',
  urlArgs: "bust=" + (new Date()).getTime(),

  map: {
    '*': {
      'jquery': 'src/js/wp-jquery'
    },
    'src/js/wp-jquery': {
      'jquery': 'jquery'
    }
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  },

  paths: {
    jquery: 'http://192.168.33.10/wp-includes/js/jquery/jquery.js',
    underscore: 'bower_components/underscore/underscore-min',
    handlebars: 'bower_components/handlebars/handlebars.min',
    text: 'bower_components/text/text',
    backbone: 'bower_components/backbone/backbone-min',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min'
  }

});
