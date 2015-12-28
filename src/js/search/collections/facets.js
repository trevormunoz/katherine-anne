import * as Backbone from 'backbone';
import Facet from '../models/facet';

class Facets extends Backbone.Collection {

  get model() { return Facet; }

  initialize(models, options) {
    this.type = options.type;
  }

}

export default Facets;
