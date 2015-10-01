import * as Backbone from 'backbone';

class AppRouter extends Backbone.Router {

  get routes() {
    return {
      '': 'loadDefault'
    };
  }

  initialize() {
    window.console.log('Router initialized!');
  }

  loadDefault() {
    window.console.log('loadDefault fired');
  }

}

export default AppRouter;
