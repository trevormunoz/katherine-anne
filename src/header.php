<?php
/**
 * The template for displaying the header
 *
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">

	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
</head>

<body>

	<!-- main nav -->
	<?php if ( ! is_home() && has_nav_menu( 'primary' ) ) : ?>
			<div id="secondary" class="secondary clearfix">
				<div class="site-logo">
					<a href="introduction">Home</a>
				</div><!-- .site-logo -->
				<nav id="site-navigation" class="main-navigation" role="navigation">
					<?php
						// Primary navigation menu.
						wp_nav_menu( array(
							'menu_class'     => 'nav-menu',
							'theme_location' => 'primary',
						) );
					?>
				</nav><!-- .main-navigation -->
		</div><!-- .secondary -->
	<?php endif; ?>
