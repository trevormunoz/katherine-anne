import * as elasticsearch from 'elasticsearch';

const searchClient = new elasticsearch.Client({
  host: 'http://192.168.33.11:9200',
  apiVersion: '1.7'
  //, log: 'trace'
});

export default searchClient;
