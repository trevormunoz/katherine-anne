<?php
/**
 * The template for displaying the footer
 *
 */
?>

<footer>
  <div class="footer-content">
    <nav id="site-navigation-list" class="site-footer-nav" role="navigation">
      <!-- nav in footer styled as list + in toolbar as list-in-modal -->
      <?php if ( has_nav_menu( 'primary' )  ) : ?>
        <?php
          // Site navigation menu.
          wp_nav_menu( array(
            'menu_class'     => 'menu-list',
            'theme_location' => 'primary',
          ) );
        ?>
      <?php endif; ?>
    </nav>
    <div class="credits">
      <img src="<?php echo get_stylesheet_directory_uri() ?>/img/LibLogo-1x.png" alt="University of Maryland Libraries' logo">
    </div>
  </div>
  <nav id="site-navigation-bar" class="site-navbar" role="navigation">
    <button type="button" class="btn nav-button" data-toggle="modal" data-target=".site-tools-menu">Menu</button>
    <button type="button" class="btn nav-button" data-toggle="modal" data-target=".site-tools-search">
      <span class="genericon genericon-search"></span>
    </button>
  </nav><!-- .site-nav -->
</footer>
<?php wp_footer(); ?>

</body>
</html>
