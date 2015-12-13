import $ from 'jquery';
import * as Backbone from 'backbone';
import Events from '../helpers/backbone-events';

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
    this.listenTo(Events, 'search:noQuery', this.handleEmptyQuery);
  }

  sendQuery() {
    if( this.query !== '' ) {
      dispatcher.trigger('router:go', ('search/?q=' + this.query));
    }
  handleEmptyQuery() {
    window.console.log('query was empty');
  }

}

export default SearchBoxView;
