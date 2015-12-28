import BaseView from '../../utils/_base-view';
import ResultItemView from './searchResultItem-view';

class SearchResultsView extends BaseView {

  get el() { return '.search-results'; }

  initialize() {
    this.render();
  }

  render() {
    this.collection.each(this.renderResult, this);
    return this;
  }

  renderResult(item) {
    let resultItemView = new ResultItemView({model: item});
    this.registerSubView(resultItemView);
    this.$el.append(resultItemView.$el);
    return this;
  }

}

export default SearchResultsView;
