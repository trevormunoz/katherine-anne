

    var AppRouter = Backbone.Router.extend({

      routes: {
        '': 'loadDefault'
      },

      initialize: function() {
        window.console.log('Router initialized!');
      },

      loadDefault: function() {
        window.console.log('loadDefault fired');
      }

    });

