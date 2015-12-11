import * as Backbone from 'backbone';
import Items from '../collections/items';
import SearchBoxView from '../views/searchBox-view';
import SearchResultsView from '../views/searchResults-view';
import DocumentSet from '../helpers/search';
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
    let q = queryString.substring(2);

    DocumentSet.search(q).then(function(result) {
      let currentDocuments = new DocumentSet(result).documents;
      let docCollection = new Items(currentDocuments);
      new SearchResultsView({collection: docCollection}).render();
    });
  }

}

export default AppRouter;
