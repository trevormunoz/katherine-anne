import $ from 'jquery';
import BaseView from '../../utils/_base-view';

class SearchBoxView extends BaseView {

  get el() { return '#search-box'; }

  get query() {
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
  }

  handleEmptyQuery() {
    //window.console.log('query was empty');
  }

}

export default SearchBoxView;
