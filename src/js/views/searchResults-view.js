import $ from 'jquery';
import * as Backbone from 'backbone';

class SearchResultsView extends Backbone.View {

  get className() { return 'results'; }

  initialize() {
    window.console.log('SearchResultsView initialized!');
  }


}

export default SearchResultsView;
