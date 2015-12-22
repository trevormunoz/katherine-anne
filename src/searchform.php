<?php
/**
 * Custom search box.
 *
 */
?>
<div class="site-search-form">
 <form id="search-box" class="form-inline" action="/search/" method="get">
   <div class="form-group">
     <input type="search" placeholder="Search correspondence …" name="q" value="<?php the_search_query(); ?>">
   </div>
   <button type="submit" class="btn btn-primary">
     <span class="genericon genericon-search"></span>
   </button>
 </form>
</div>
