import * as Handlebars from 'handlebars';

let facetItemTemplate = `
<label class="c-input c-checkbox">
  <input id="{{ elId }}" type="checkbox" />
  <span class="c-indicator"></span>
  {{ key }} ({{ doc_count }})
</label>`;

export default Handlebars.compile(facetItemTemplate);
