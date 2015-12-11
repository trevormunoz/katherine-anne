import * as elasticsearch from 'elasticsearch';
import {SEARCH_ROOT_URL} from '../helpers/config';

const searchClient = new elasticsearch.Client({
  host: SEARCH_ROOT_URL,
  apiVersion: '2.1'
  //, log: 'trace'
});

export default searchClient;
