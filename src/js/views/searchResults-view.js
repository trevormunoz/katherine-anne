import BaseView from './_base-view';

class SearchResultsView extends BaseView {

  get className() { return 'results'; }

  initialize() {
    window.console.log(this.collection);
  }

  render() {
    // Do Something
  }

}

export default SearchResultsView;
