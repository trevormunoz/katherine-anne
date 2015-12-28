import $ from 'jquery';
import * as _ from 'underscore';
import BaseView from '../../utils/_base-view';
import Facets from '../collections/facets';
import FacetBodyView from './searchFacetBody-view';
import FacetAlertsView from './searchFacetAlerts-view';
import Messages from '../../utils/messenger';

class SearchFacetsView extends BaseView {

  get el() { return '.search-facets'; }

  get events() {
    return {
      "click .facet-label": "switchFacet",
      "click .facet-controls .drawer-toggle": "closeFacetDrawer"
    };
  }

  // Mapping between UI labels and keys in data from server
  get facetLabelMap() {
    return {
      'date': 'decades',
      'location': 'locations',
      'recipient': 'recipients'
    };
  }

  initialize(options = {}) {
    this.options = options;

    // initialize an empty collection that will hold all activated facets
    // from any of the subviews
    this.collection = new Facets([], {type: 'active'});
    this.initAlertSubView();

    this.listenTo(Messages, 'search:showFacet', this.activateFacetSubView);
    this.listenTo(Messages, 'search:filter', this.setFacet);
  }

  setFacet(options) {
    let message = options;

    // Map back into the UI labels
    // let reversedFacetLabelMap = _.invert(this.facetLabelMap);
    // let currentType = message.type;
    // message.type = reversedFacetLabelMap[currentType];

    // Pass the reference to the model along …
    message.action === 'add'
      ? this.addActiveFacet(message.model)
      : this.removeActiveFacet(message.model);
  }

  addActiveFacet(model) {
    // Add the passed model to the new collection here
    this.collection.add(model);
  }

  removeActiveFacet() {
    // Separate subviews (for facet lists and for alerts) listen to and handle
    // 'remove' events and propagate them down to changes in the UI.
    // So, for now, do nothing here.
    // API could be simplified by having 'search:filter' just trigger
    // addActiveFacet directly in context of this view but this way is more explicit
    $.noop();
  }

  switchFacet(event) {
    let $selectedLabel = $(event.currentTarget);
    let key = $selectedLabel.text().toLowerCase();

    if(this.facetLabelMap[key]) {
      Messages.trigger('search:showFacet', {
        labelElement: $selectedLabel,
        facetName: this.facetLabelMap[key]
      });
    } else if (!$selectedLabel.hasClass('active')) {
      this.clearAllFacets();
    } else {
      $.noop();
    }
  }

  activateFacetSubView(options) {
    this.showFacetDrawer();

    let existingFacetView = _.findWhere(this._subviews, {id: options.facetName});
    // If this is the first time triggering a facet
    // create the view
    if(!existingFacetView) {
      this.initFacetSubView(options.facetName);
    } else {
      $(existingFacetView.el).addClass('active');
    }

    // If nothing blows up, update the toolbar UI
    this.highlightFacetLabel(options.labelElement);
  }

  initFacetSubView(name) {
    let facetBodyView = new FacetBodyView({id: name, data: this.options.resultFragment[name]});
    this.registerSubView(facetBodyView);
    $('.facet-body-container').append(facetBodyView.$el);
  }

  initAlertSubView() {
    // Make the alertSubView a "view" of the active facet collection created above
    let facetAlertsView = new FacetAlertsView({collection: this.collection});
    this.registerSubView(facetAlertsView);
    this.assign(facetAlertsView, '.facet-alert-container');
  }

  showFacetDrawer() {
    $('.facet-toolbar').addClass('drawer-open');
    $('.facet-body-container').addClass('drawer-open');
    $('.facet').removeClass('active');
  }

  closeFacetDrawer() {
    $('.facet-toolbar').removeClass('drawer-open');
    $('.facet-body-container').removeClass('drawer-open');
  }

  highlightFacetLabel(el) {
    // Update facet toolbar UI
    $('.facet-label.active').removeClass('active');
    el.addClass('active');
  }

  clearAllFacets() {
    // Update the UI first
    $('.facet-toolbar').removeClass('drawer-open');
    $('.facet-body-container').removeClass('drawer-open').css('display', 'none');

    // Destroy facet views and reboot search
    if(this._subviews) {
      _.invoke(this._subviews, 'remove');
    }
    Messages.trigger('search:getInput');
  }
}

export default SearchFacetsView;
