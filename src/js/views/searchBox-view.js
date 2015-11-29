import $ from 'jquery';
import * as Backbone from 'backbone';
import dispatcher from '../helpers/dispatcher.js';

class SearchBoxView extends Backbone.View {

  get el() { return '#search-box'; }

  get events() {
    return {
      'submit form': 'getQuery'
    }
  }

  initialize() {
    window.console.log('SearchBoxView initialized!');
  }

  getQuery() {
    let query = $('#search-box input').val();
    if( query !== '' ) {
      dispatcher.trigger('router:go', 'search/?q=' + query);
    }
  }

}

export default SearchBoxView;
