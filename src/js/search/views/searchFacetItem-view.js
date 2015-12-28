import * as _ from 'underscore';
import BaseView from '../../utils/_base-view';
import FacetItemTemplate from '../templates/search-facetItem-template';
import Messages from '../../utils/messenger';

class SearchFacetItemView extends BaseView {

  get tagName() { return 'li'; }

  get className() { return 'facet-list-item'; }

  get events() {
    return {
      "click .c-checkbox": "facetItemToggled"
    };
  }

  get template() { return FacetItemTemplate; }

  initialize() {
    this.render();
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));

    // Disable empty facets on display. Applies to date ranges only
    if(this.model.get('doc_count') === 0) {
      this.$el.find('input').prop('disabled', true);
    }
    return this;
  }

  facetItemToggled(event) {
    // Checkboxes spawn two events, so this will fire twice for each click.
    // So, eat events for targets that are not an input such that
    // this function can fire twice but one run will be a no-op.
    // More: http://stackoverflow.com/a/19595155/1232820
    let targetedElementName = event.target.tagName.toUpperCase();
    if( targetedElementName === "SPAN" | targetedElementName === "LABEL") {
      return;
    }

    let filter = {
      type: this.model.collection.type,
      model: this.model
    };

    if(!this.model.get('active') === true) {
      // sole source of "add" actions & maybe this should just update the URL???
      _.extend(filter, {action: 'add'});
      Messages.trigger('search:filter', filter);
      this.model.set('active', true);
    } else {
      _.extend(filter, {action: 'remove'});
      Messages.trigger('search:filter', filter);
      Messages.trigger('facet:unset', this.model);
      this.model.set('active', false);
    }
  }

  // When facet "alert" is closed, uncheck the checkbox
  // Triggered from parent view that knows about alerts
  uncheckFacetItem() {
    this.$el.find('input[type="checkbox"]').prop('checked', false);
  }
}

export default SearchFacetItemView;
