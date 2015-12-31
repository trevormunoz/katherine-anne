import * as elasticsearch from 'elasticsearch';
import d3Connector from './xhr';
import {SEARCH_ROOT_URL} from '../../utils/config';

const searchClient = new elasticsearch.Client({
  host: SEARCH_ROOT_URL,
  connectionClass: d3Connector,
  apiVersion: '2.1'
  // , log: 'trace'
});

export default searchClient;
