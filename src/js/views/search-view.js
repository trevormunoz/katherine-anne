import BaseView from './_base-view';
import SearchBoxView from './searchBox-view';

class SearchView extends BaseView {

  initialize() {
    window.console.log('SearchView initialized.');
    let searchBoxView = new SearchBoxView();
    this.registerSubView(searchBoxView);

    this.listenTo(Events, 'search:started', this.handleSearch);
  }

  handleSearch(searchPromise) {
    window.console.log('Search result handler fired');
    searchPromise.then(function(result) {
      window.console.log(result);
    });
  }
}

export default SearchView;
