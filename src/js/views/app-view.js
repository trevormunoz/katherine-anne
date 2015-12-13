import BaseView from './_base-view';
import Events from '../helpers/backbone-events';
import SearchView from './search-view';
import ItemView from './item-view';

class AppView extends BaseView {

  initialize() {
    // Set up the two major subviews of the application
    // One for searching and one for viewing individual items
    let searchView = new SearchView();
    this.registerSubView(searchView);
    let itemView = new ItemView();
    this.registerSubView(itemView);

    this.listenTo(Events, 'views:cleanUp', this.cleanUp);
  }

  get el() { return '#primary'; }

  cleanUp() {
    this.remove();
  }

}

export default AppView;
