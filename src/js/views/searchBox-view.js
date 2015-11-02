import $ from 'jquery';
import * as Backbone from 'backbone';

class SearchBoxView extends Backbone.View {

  get el() { return '.search-teaser'; }

  get events() {
    return {
      'submit form': 'getQuery'
    }
  }

  initialize() {
    window.console.log('SearchBoxView initialized!');
  }

  getQuery() {
    let query = $('.search-teaser input').val();
    if( query !== '' ) {
      Backbone.trigger('router:queryString', query);
    }
  }

}

export default SearchBoxView;
