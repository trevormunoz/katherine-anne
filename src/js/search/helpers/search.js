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
    return this.returnedDocuments();
  }

  get pages() {
    return this.calculatePages();
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

    // d3_request doesn't implement a promise interface
    // so create one here --- if we were using the default
    // http connector or the jQuery connector, we could simply
    // omit the callback in the es client below and get a
    // promise to consume directly in our app
    let searchPromise = new Promise((resolve, reject) => {

      searchClient.searchTemplate({
        index: 'kap',
        sort: '_doc',
        body: queryObj
      }, (err, resultObj) => {
        // The serialization errors might be quote-escaping problems in source
        // documents TOFIX
        if(err.message !== 'Unable to parse/serialize body') {
          reject(err)
        }

        resolve(resultObj);
      });
    });

    return searchPromise;
  }

  calculatePages(pageSize = 20) {
    return Math.ceil(this.totalHits % pageSize);
  }

  returnedDocuments() {
    let documents = this.hits.hits;
    return _.map(documents, (doc) => { return doc._source; });
  }

}

export default DocumentSet;
