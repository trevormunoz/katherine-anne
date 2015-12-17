import * as Backbone from 'backbone';
import Facet from '../models/facet';

class Facets extends Backbone.Collection {

  get model() { return Facet; }

}

export default Facets;
