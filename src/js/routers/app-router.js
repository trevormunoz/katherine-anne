import * as Backbone from 'backbone';
import SearchBoxView from '../views/searchBox-view';
import SearchResultsView from '../views/searchResults-view';
import dispatcher from '../helpers/dispatcher';

class AppRouter extends Backbone.Router {

  get routes() {
    return {
      '': 'loadDefault',
      'search/(?*queryString)': 'showSearchResults'
    };
  }

  initialize() {
    this.listenTo(dispatcher, 'router:go', this.go);
  }

  go(route) {
    this.navigate(route, {trigger: true});
  }

  loadDefault() {
    new SearchBoxView();
  }

  showSearchResults(queryString) {
    new SearchResultsView({query: queryString});
  }

}

export default AppRouter;
