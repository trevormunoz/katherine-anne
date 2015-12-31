import $ from 'jquery';
import BaseView from '../../_base-view';
import Messages from '../../messenger';
import * as viz from './spinner';

class SpinnerView extends BaseView {

  get className() { return 'spinner-container'; }

  initialize() {
    $('#primary').append(this.$el);
    viz.progressViz(this.className);

    this.listenTo(Messages, 'request:preSend', this.show);
    this.listenTo(Messages, 'request:progress', this.render);
    this.listenTo(Messages, 'search:ready', this.hide);
  }

  show() {
    this.$el.addClass('active');
  }

  render(message) {
    viz.transition(message);
  }

  hide() {
    let delay = 500;
    viz.end(delay);
    window.setTimeout(() => {
      this.$el.removeClass('active');
    }, (delay * 1.1));
  }


}

export default SpinnerView;
