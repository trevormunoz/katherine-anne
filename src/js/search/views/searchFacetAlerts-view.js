import BaseView from '../../utils/_base-view';
import FacetAlertBodyView from './searchFacetAlertBody-view';
import Messages from '../../utils/messenger';

class FacetAlertsView extends BaseView {

  initialize(options = {}) {
    this.options = options;

    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(Messages, 'facet:unset', this.unsetFacet);
  }

  render() {
    this.$el.empty();
    this.collection.each(this.renderAlert, this);
    return this;
  }

  renderAlert(model) {
    let facetAlertBodyView = new FacetAlertBodyView({
      id: model.cid,
      model: model,
      className: model.collection.type
    });
    this.registerSubView(facetAlertBodyView);
    this.$el.append(facetAlertBodyView.$el);
    return this;
  }

  // Removing the model triggers re-render of "alerted" facets
  unsetFacet(model) {
    this.collection.remove(model.cid);
  }

}

export default FacetAlertsView;
