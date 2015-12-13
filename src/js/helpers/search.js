import * as _ from 'underscore';
import searchClient from './client';

class DocumentSet {

  constructor(query, response) {
    this.query = query;
    this.hits = response.hits;
    this.facets = response.aggregations;
  }

  get totalHits() { return this.hits.total; }

  get documents() {
    return this.returnDocuments();
  }

  static search(query) {
    const queryRegex = /^["']/;
    let queryTemplate = queryRegex.test(query) ?
      'faceted_phrase_query' : 'faceted_base_query';

    let queryObj = {
      template: queryTemplate,
      params : {
        query_string: query
      }
    };

    let searchPromise = searchClient.searchTemplate({
      index: 'kap',
      sort: '_doc',
      body: queryObj
    });

    return searchPromise;
  }

  calculatePages(pageSize = 20) {
    return Math.ceil(this.totalHits % pageSize);
  }

  returnDocuments() {
    let documents = this.hits.hits;
    return _.map(documents, (doc) => { return doc._source; });
  }

}

export default DocumentSet;
