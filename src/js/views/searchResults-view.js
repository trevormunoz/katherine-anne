import BaseView from './_base-view';

class SearchResultsView extends BaseView {

  get className() { return 'results'; }

  render() {
    window.console.log(this.collection);
  }

}

export default SearchResultsView;
