import BaseView from './_base-view';
import SearchBoxView from './searchBox-view';
import Events from '../helpers/backbone-events';

class SearchView extends BaseView {

  initialize() {
    window.console.log('SearchView initialized.');
    let searchBoxView = new SearchBoxView();
    this.registerSubView(searchBoxView);

  }
}

export default SearchView;
