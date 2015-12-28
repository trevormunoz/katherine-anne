import $ from 'jquery';
import BaseView from '../../utils/_base-view';
import Messages from '../../utils/messenger';

class SearchBoxView extends BaseView {

  get el() { return '.site-search-form'; }

  get queryInput() {
    return $('#search-box input').val();
  }

  displayQuery(queryString) {
    let displayString = decodeURIComponent(queryString.replace(/\+/g, '%20'));
    $('#search-box input').val(displayString);
  }

  initialize(options = {}) {
    this.options = options;
    if(!this.options.query) {
      this.handleEmptyQuery();
    } else {
      this.displayQuery(this.options.query);
    }

    this.listenTo(Messages, 'search:getInput', this.rebootSearch);
  }

  handleEmptyQuery() {
    //window.console.log('query was empty');
  }

  rebootSearch() {
    // Get the form input & send it up to the topmost search view
    Messages.trigger('search:all', this.queryInput);
  }

}

export default SearchBoxView;
