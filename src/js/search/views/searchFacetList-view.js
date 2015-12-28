import * as _ from 'underscore';
import BaseView from '../../utils/_base-view';
import SearchFacetItemView from './searchFacetItem-view';
import Messages from '../../utils/messenger';

class SearchFacetListView extends BaseView {

  initialize(options) {
    this.options = options;

    this.listenTo(Messages, 'facet:unset', this.unsetFacet);
  }

  render() {
    this.collection.each(this.renderFacetItem, this);
    return this;
  }

  renderFacetItem(facet) {
    let facetItemView = new SearchFacetItemView({model: facet});
    this.registerSubView(facetItemView);
    this.$el.append(facetItemView.$el);
    return this;
  }

  // Listening to same event that removed "alerted" facet from render,
  // trigger a UI update to uncheck the checkbox in an item view
  unsetFacet(model) {
    let matchedView = _.find(this._subviews, (v) => {
      return v.model.cid === model.cid;
    });

    // facet will be in only one list (view) so …
    if(matchedView) {
      matchedView.uncheckFacetItem();
    }
  }
}

export default SearchFacetListView;
