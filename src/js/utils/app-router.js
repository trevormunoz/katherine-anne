import * as Backbone from 'backbone';
import SearchAppView from '../search/views/searchApp-view';
import Messages from './messenger';

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

  search(queryString = '') {
    new SearchAppView({query: queryString});
  }

}

export default AppRouter;
