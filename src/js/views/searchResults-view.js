import * as Backbone from 'backbone';

class SearchResultsView extends Backbone.View {

  get className() { return 'results'; }

  render() {
    window.console.log(this.collection);
  }

}

export default SearchResultsView;
