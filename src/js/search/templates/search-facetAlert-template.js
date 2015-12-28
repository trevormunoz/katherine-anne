import * as Handlebars from 'handlebars';

let facetAlertTemplate = `
<span class="facet-alert-type">{{ type }}</span>
<span class="facet-alert-name">{{ key }}</span>
<span class="facet-alert-control">
  <button type="button" class="close" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</span>`;

export default Handlebars.compile(facetAlertTemplate);
