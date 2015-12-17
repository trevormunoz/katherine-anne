import $ from 'jquery';
import BaseView from './_base-view';

class SearchBoxView extends BaseView {

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
