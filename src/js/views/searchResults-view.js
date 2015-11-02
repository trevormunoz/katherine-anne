import $ from 'jquery';
import * as Backbone from 'backbone';

class SearchResultsView extends Backbone.View {

  get el() { return '.content-area.search'; }

  initialize() {
    window.console.log('SearchResultsView initialized!');
  }


}

export default SearchResultsView;
