import $ from 'jquery';
import * as Backbone from 'backbone';

class SearchBoxView extends Backbone.View {

  get el() { return '#search-box'; }

  get query() {
    return $('#search-box input').val();
  }

  }

  handleEmptyQuery() {
    window.console.log('query was empty');
  }

}

export default SearchBoxView;
