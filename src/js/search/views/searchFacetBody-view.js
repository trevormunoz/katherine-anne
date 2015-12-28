import * as _ from 'underscore';
import $ from 'jquery';
import BaseView from '../../utils/_base-view';
import Facets from '../collections/facets';
import FacetBodyTemplate from '../templates/search-facetBody-template';
import SearchFacetListView from './searchFacetList-view';
import SearchFacetCardView from './searchFacetCard-view';
// import Messages from '../../utils/messenger';

class FacetBodyView extends BaseView {

  get className() { return 'facet active'; }

  get events() {
    return {
      "click .facet-controls .view-toggle": "changeFacetDisplay"
    };
  }

  get template() { return FacetBodyTemplate; }

  initialize(options) {
    this.options = options;
    this.collection = new Facets(this.options.data.buckets, {type: this.options.id});
    this.render();
  }

  render() {
    // Create the basic structure of the facet body
    this.$el.html(this.template());

    // Render the subcomponents
    this.renderFacetCard();
    this.renderFacetList();

    return this;
  }

  renderFacetCard() {
    let facetCardView = new SearchFacetCardView({collection: this.collection});
    this.registerSubView(facetCardView);
    this.assign(facetCardView, '.facet-card');
    return this;
  }

  renderFacetList() {
    let facetListView = new SearchFacetListView({collection: this.collection});
    this.registerSubView(facetListView);
    this.assign(facetListView, '.facet-list');
    return this;
  }

  changeFacetDisplay() {
    // Swap which one is visible on click
    let $current = this.$el.children('.active'),
        hidden = this.$el.children().not('.active'),
        next = _.filter(hidden, (el) => {
          return $(el).hasClass('facet-list') || $(el).hasClass('facet-card');
        })[0];
    $current.removeClass('active');
    $(next).addClass('active');
  }
}

export default FacetBodyView;
