<?php
/**
 * The template used for displaying site-wide tools: menu, search
 *
 */
?>

<div class="site-tools-menu fade">
  <div class="site-menu-container">
    <div class="site-menu">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <?php if ( has_nav_menu( 'primary' )  ) : ?>
        <?php
          // Primary navigation menu.
          wp_nav_menu( array(
            'menu_class'     => 'nav nav-pills nav-inline',
            'theme_location' => 'primary',
          ) );
        ?>
      <?php endif; ?>
    </div>
  </div><!-- .site-menu -->
</div><!-- .site-tools-menu -->

<div class="site-tools-search fade">
  <div class="site-search-container">
    <div class="site-search">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <h3><small>Search</small> Katherine Anne Porter Correspondence</h3>
      </div>
      <?php get_search_form(); ?>
    </div><!-- .site-search-container -->
  </div><!-- .search-teaser -->

</div><!-- .site-tools-search -->
