import $ from 'jquery';
import * as Backbone from 'backbone';

class SearchResultsView extends Backbone.View {

  get className() { return 'results'; }

  initialize(options) {
    this.options = options;
    window.console.log('SearchResultsView initialized!');
    window.console.log(this.options.query);
  }


}

export default SearchResultsView;
