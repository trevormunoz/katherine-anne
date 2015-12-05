import $ from 'jquery';
import * as Backbone from 'backbone';
import searchClient from '../helpers/search.js';

class SearchResultsView extends Backbone.View {

  get className() { return 'results'; }

  initialize(options) {
    let query = options.query.substring(2);
    let queryObj = {
      query: {
        template: {
          file: 'base_query',
          params: {
            query_string: query
          }
        }
      }
    };

    searchClient.search({
      index: 'kap',
      type: 'item',
      body: queryObj
    }, function(err, response) {
      if(!err) {
        window.console.log(response.hits);
      }
    })
  }


}

export default SearchResultsView;
