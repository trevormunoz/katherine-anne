import * as _ from 'underscore';
import BaseView from '../../utils/_base-view';
import FacetAlertTemplate from '../templates/search-facetAlert-template';
import Messages from '../../utils/messenger';

class FacetAlertBodyView extends BaseView {

  get className() { return 'facet-alert'; }

  get events() {
    return {
      "click .facet-alert-control .close": "facetAlertClosed"
    };
  }

  get template() { return FacetAlertTemplate; }

  initialize() {
    this.render();
  }

  render() {
    // Need to pass in type again because it is used in the body of the template
    let alertData = _.extend(this.model.attributes, {type: this.model.collection.type });
    this.$el.html(this.template(alertData));
    this.$el.addClass(this.model.get('type'));
    return this;
  }

  facetAlertClosed() {
    // Match non-active model logic branch from SearchFacetItemView
    let filter = {
      type: this.model.collection.type,
      model: this.model
    };

    _.extend(filter, {action: 'remove'});
    Messages.trigger('search:filter', filter);
    Messages.trigger('facet:unset', this.model);
    this.model.set('active', false);
  }

}

export default FacetAlertBodyView;
