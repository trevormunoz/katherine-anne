import * as Backbone from 'backbone';
import AppView from '../views/app-view';
import Events from '../helpers/backbone-events';
import DocumentSet from '../helpers/search';

class AppRouter extends Backbone.Router {

  get routes() {
    return {
      '': 'loadDefault',
      'search/(?q=*queryString)': 'search'
    };
  }

  initialize() {
    this.listenTo(Events, 'router:go', this.go);
  }

  go(route) {
    this.navigate(route, {trigger: true});
  }

  loadDefault() {
    new AppView();
  }

  search(queryString) {
    queryString = queryString || '';

    if (queryString !== '') {
      let search = DocumentSet.search(queryString);
      Events.trigger('search:started', search, queryString);
    } else {
      Events.trigger('search:noQuery');
    }
  }

}

export default AppRouter;
