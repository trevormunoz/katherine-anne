import BaseView from '../../utils/_base-view';

class SearchFacetCardView extends BaseView {

  render() {
    this.$el.html();
    this.$el.addClass('active');
    return this;
  }
}

export default SearchFacetCardView;
