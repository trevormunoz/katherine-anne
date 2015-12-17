import * as Backbone from 'backbone';
import DocumentSet from '../helpers/search';
import Messages from '../helpers/messenger';

class AppRouter extends Backbone.Router {

  get routes() {
    return {
      'search/(?q=*queryString)': 'search'
    };
  }

  initialize() {
    this.listenTo(Messages, 'router:go', this.go);
  }

  go(route) {
    this.navigate(route, {trigger: true});
  }

  search(queryString) {
    queryString = queryString || '';

    if (queryString !== '') {
      let search = DocumentSet.search(queryString);
      Events.trigger('search:started', search, queryString);
    } else {
      Events.trigger('search:noQuery');
    }
  }

}

export default AppRouter;
