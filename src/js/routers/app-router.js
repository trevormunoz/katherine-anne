import * as Backbone from 'backbone';
import SearchBoxView from '../views/searchBox-view.js';
import SearchResultsView from '../views/searchResults-view.js';

class AppRouter extends Backbone.Router {

  get routes() {
    return {
      '': 'loadDefault',
      'search/results': 'showSearchResults'
    };
  }

  initialize() {
    window.console.log('Router initialized');
  }

  loadDefault() {
    new SearchBoxView();
  }

  showSearchResults() {
    new SearchResultsView();
  }

}

export default AppRouter;
