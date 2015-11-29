import * as Backbone from 'backbone';
import SearchBoxView from '../views/searchBox-view.js';
import SearchResultsView from '../views/searchResults-view.js';
import dispatcher from '../helpers/dispatcher.js';

class AppRouter extends Backbone.Router {

  get routes() {
    return {
      '': 'loadDefault',
      'search/(?*queryString)': 'showSearchResults'
    };
  }

  initialize() {
    window.console.log('Router initialized');
    this.listenTo(dispatcher, 'router:go', this.go);
  }

  go(route) {
    this.navigate(route, {trigger: true});
  }

  loadDefault() {
    new SearchBoxView();
  }

  showSearchResults() {
    new SearchResultsView();
  }

}

export default AppRouter;
