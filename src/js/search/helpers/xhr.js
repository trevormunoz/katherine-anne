import Host from '../../../../node_modules/elasticsearch/src/lib/host';
import ConnectionAbstract from '../../../../node_modules/elasticsearch/src/lib/connection';
import ConnectionFault from '../../../../node_modules/elasticsearch/src/lib/errors';
import * as d3_request from 'd3-request';
import Messages from '../../utils/messenger';

class d3Connector extends ConnectionAbstract {

  constructor(host, config) {
    // ConnectionAbstract checks that host is a Host,
    // so create it a new instance before calling super
    let hostObj = new Host(host);
    super(hostObj, config);
    this.host = hostObj;
  }

  request(params, cb) {
    let xhr = d3_request.request(this.host.makeUrl(params))
      .mimeType(params.headers['content-type'])
      .on("beforesend", () => { Messages.trigger('request:preSend'); })
      .on("progress", this.progressCallback)
      .on("error", (xhr) => { cb(new ConnectionFault(xhr && xhr.message)); })
      .on("load", (xhr) => {
        cb(null, xhr, xhr.status, {
          'content-type': xhr.getResponseHeader('content-type')
        });
      })
      .response((xhr) => { return JSON.parse(xhr.responseText); })
      .send(params.method, params.body, cb);

      return () => {
        xhr.abort();
      }
  }

  progressCallback(event) {
    let eventMessage = {loaded: event.loaded, total: event.total};
    Messages.trigger('request:progress', eventMessage);
  }

}

export default d3Connector;
