import $ from 'jquery';
import * as Backbone from 'backbone';

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

  handleEmptyQuery() {
    window.console.log('query was empty');
  }

}

export default SearchBoxView;
