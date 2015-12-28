import BaseView from '../../utils/_base-view';
import SearchResultTemplate from '../templates/search-result-template';

class ResultItemView extends BaseView {

  get className() { return 'result'; }

  get id() { return this.paddedId; }

  get events() {
    return {
      "click .result-body h2": "viewItem",
      "click .result-cap": "viewItem"
    };
  }

  get template() { return SearchResultTemplate; }

  initialize() {
    this.render();
  }

  paddedId(size = 4) {
    let zeroPadding = '000';
    return (zeroPadding + this.model.get('_id')).slice(-size);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  viewItem() {
    window.console.log(`item ${this.model.get('_id')} requested.`);
    // And actually proceed to show the item page …
  }
}

export default ResultItemView;
