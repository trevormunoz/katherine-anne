import * as Handlebars from 'handlebars';

let searchResultTemplate = `
<div class="result-body">
  <h2>{{ title }}</h2>
  <div class="result-subhead">{{ size }} pages</div>
</div><!-- .result-body -->
<div class="result-cap">
  <img src="http://placehold.it/65x80">
</div><!-- .result-cap -->`;

export default Handlebars.compile(searchResultTemplate);
