import * as Handlebars from 'handlebars';

let searchCountTemplate = `
<div class="search-total-count" style="display: flex;">
  {{ total }} total results
</div>`;

export default Handlebars.compile(searchCountTemplate);
