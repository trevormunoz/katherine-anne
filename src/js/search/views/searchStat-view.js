import BaseView from '../../utils/_base-view';
import SearchCountTemplate from '../templates/search-count-template';

class SearchStatView extends BaseView {

  get template() { return SearchCountTemplate; }

  initialize(options) {
    this.options = options;
  }

  render() {
    return this.template(this.options);
  }
}

export default SearchStatView;
