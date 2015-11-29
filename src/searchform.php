<?php
/**
 * Custom search box.
 *
 */
?>

 <form id="search-box" class="form-inline" action="/search/" method="get">
   <div class="form-group">
     <input type="search" placeholder="Search correspondence …" name="q" value="<?php the_search_query(); ?>">
   </div>
   <button type="submit" class="btn btn-primary">Search</button>
 </form>
