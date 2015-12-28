import * as Handlebars from 'handlebars';

let facetBodyTemplate = `
<div class="facet-controls">
  <a class="view-toggle">view as list | card</a>
  <div class="drawer-toggle">
    <button type="button" class="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>
<ol class="facet-list"></ol>
<div class="facet-card"></div>`;

export default Handlebars.compile(facetBodyTemplate);
