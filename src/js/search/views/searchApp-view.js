import $ from 'jquery';
// import * as _ from 'underscore';
import BaseView from '../../utils/_base-view';
import SearchBoxView from './searchBox-view';
import DocumentSet from '../helpers/search';
import Documents from '../collections/documents';
import SearchResultsView from './searchResults-view';
import SearchFacetsView from './searchFacets-view';
import SearchStatView from './searchStat-view';
import Messages from '../../utils/messenger';

class SearchAppView extends BaseView {

  get el() { return '.search'; }

  get events() {
    return {
      "click .search-button": "nextResults"
    };
  }

  initialize(options = {}) {
    this.options = options;

    // Fire up a search box, and
    // if there's a query, start the search
    this.initSearchBox();
    if (this.options.query) {
      this.doSearch();
    }

    this.listenTo(Messages, 'search:noResults', this.showEmptySearchMsg);
    this.listenTo(Messages, 'search:showSinglePageFooter', this.renderSearchTotal);
    this.listenTo(Messages, 'search:showPaginationFooter', this.showNextButton);
    this.listenTo(Messages, 'search:all', this.restart);
    this.listenTo(Messages, 'search:filter', this.doFacet);
  }

  initSearchBox() {
    let searchBoxView = new SearchBoxView(this.options);
    this.registerSubView(searchBoxView);
  }

  doSearch() {
    this.options.search = DocumentSet.search(this.options.query);
    this.handleSearch();
  }

  // Makes navigating back to "All" in the facet toolbar
  // a kind of start over/refresh of the search. Not sure
  // yet if this is desirable behavior
  restart() {
    // Trigger remove from here so the whole chain of subviews
    // gets cleaned up
    this.remove();
    window.location.reload();
  }

  doFacet(facetEventMsg) {
    window.console.log(facetEventMsg);
  }

  handleSearch() {
    // DocumentSet.search is static method that returns a promise
    // take that promise passed in here, resolve it, and use the resulting
    // object to instantiate a DocumentSet
    // add that resulting (promise of a) DocumentSet object to this.options
    let results = this.options.search.then((resultObj) => {
      // Only bother to create the object if a search has results
      if(resultObj.hits.total === 0) {
        Messages.trigger('search:noResults');
        return;
      } else {
        return new DocumentSet(this.options.query, resultObj);
      }
    });

    results.then((docset) => {
      if(docset) {
        this.options.results = docset;
        this.initResultSubViews();
        this.updateResultUI();
      }
    });

    results.catch((err) => {
      window.console.log(`Something went wrong with the search: ${err}.`);
    });
  }

  initResultSubViews() {
    // For documents, create collection and pass to view on initialization
    let docs = new Documents(this.options.results.documents);
    let resultsView = new SearchResultsView({collection: docs});
    this.registerSubView(resultsView);

    // Facets have more view layers so just pass along
    // the relevant part of the result object without
    // initializing a collection
    let facetView = new SearchFacetsView({resultFragment: this.options.results.facets});
    this.registerSubView(facetView);
  }

  updateResultUI() {
    let count = this.options.results.totalHits;
    if (count >= 1 && count < 11) {
      Messages.trigger('search:showSinglePageFooter');
    } else {
      Messages.trigger('search:showPaginationFooter');
    }
  }

  renderSearchTotal() {
    let statView = new SearchStatView({total: this.options.results.totalHits});
    this.registerSubView(statView);
    this.$el.append(statView.render());
    return this;
  }

  showNextButton() {
    $('.search-button').css('display', 'block').removeClass('disabled');
  }

  nextResults() {
    window.console.log(this.options.results.pages + ' pages of results. Next page requested.');
    // Actually get the next page …
  }

  showEmptySearchMsg() {
    $('.search-results').addClass('visible');
  }
}

export default SearchAppView;
