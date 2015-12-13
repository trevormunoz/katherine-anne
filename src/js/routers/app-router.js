import * as Backbone from 'backbone';
import Items from '../collections/items';
import SearchBoxView from '../views/searchBox-view';
import SearchResultsView from '../views/searchResults-view';
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

    DocumentSet.search(q).then(function(result) {
      let currentDocuments = new DocumentSet(result).documents;
      let docCollection = new Items(currentDocuments);
      new SearchResultsView({collection: docCollection}).render();
    });
    queryString = queryString || '';
  }

}

export default AppRouter;
