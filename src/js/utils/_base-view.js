import * as _ from 'underscore';
import * as Backbone from 'backbone';

class BaseView extends Backbone.View {

  constructor(options = {}) {
    super(options);
    this._subviews = null;
  }

  assign(view, selector) {
    // selector has to be present & in scope
    view.setElement(this.$(selector)).render();
  }

  registerSubView(view) {
    this._subviews = this._subviews || [];
    this._subviews.push(view);
  }

  remove() {
    _.invoke(this._subviews, 'remove');
    Backbone.View.prototype.remove.call(this);
  }

}

export default BaseView;
