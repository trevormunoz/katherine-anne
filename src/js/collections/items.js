import * as Backbone from 'backbone';
import Item from '../models/item';

class Items extends Backbone.Collection {

  get model() { return Item; }

}

export default Items;
