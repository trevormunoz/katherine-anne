import * as Backbone from 'backbone';
import Document from '../models/document';

class Documents extends Backbone.Collection {

  get model() { return Document; }

}

export default Documents;
