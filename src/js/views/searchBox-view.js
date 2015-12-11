import $ from 'jquery';
import * as Backbone from 'backbone';
import dispatcher from '../helpers/dispatcher';

class SearchBoxView extends Backbone.View {

  get el() { return '#search-box'; }

  get events() {
    return {
      'submit form': 'sendQuery'
    }
  }

  get query() {
    return $('#search-box input').val();
  }

  initialize() {
    window.console.log('SearchBoxView initialized!');
  }

  sendQuery() {
    if( this.query !== '' ) {
      dispatcher.trigger('router:go', ('search/?q=' + this.query));
    }
  }

}

export default SearchBoxView;
