import * as Backbone from 'backbone';
import SearchView from '../views/search-view';
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

  search(queryString = '') {
    new SearchView({query: queryString});
  }

}

export default AppRouter;
