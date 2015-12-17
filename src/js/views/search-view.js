import * as _ from 'underscore';
import BaseView from './_base-view';
import SearchBoxView from './searchBox-view';
import DocumentSet from '../helpers/search';
import Items from '../collections/items';
import SearchResultsView from './searchResults-view';
import Facets from '../collections/facets';
import SearchFacetView from './searchFacet-view';

class SearchView extends BaseView {

  initialize(options = {}) {
    this.options = options;
    if (!this.options.query) {
      this.initSearchBox();
    } else {
      this.initSearchBox(options);
      let search = DocumentSet.search(this.options.query);
      this.handleSearch(search);
    }
  }

  initSearchBox(options = {}) {
    let searchBoxView = new SearchBoxView(options);
    this.registerSubView(searchBoxView);
  }

  handleSearch(searchPromise) {
    searchPromise.then((result) => {
      let documents = _.map(result.hits.hits, (doc) => { return doc._source; });
      let items = new Items(documents);
      let resultsView = new SearchResultsView({collection: items});
      this.registerSubView(resultsView);
    });

    searchPromise.then((result) => {
      let facetNames = _.keys(result.aggregations);
      _.each(facetNames, (name) => {
        let facetCollex = new Facets(result.aggregations[name].buckets);
        let facetView = new SearchFacetView({collection: facetCollex});
        this.registerSubView(facetView);
      });
    });
  }
}

export default SearchView;
