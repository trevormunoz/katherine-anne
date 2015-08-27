<?php
/**
 * The template for displaying the header
 *
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
</head>

<body>

	<!-- main nav -->
	<?php if ( ! is_home() && has_nav_menu( 'primary' ) ) : ?>
			<div id="secondary" class="secondary">
				<div class="site-menu">
					<div class="site-logo">
						<a href="/introduction">Home</a>
					</div><!-- .site-logo -->
					<nav id="site-navigation" class="site-nav" role="navigation">
						<?php
							// Primary navigation menu.
							wp_nav_menu( array(
								'menu_class'     => 'nav nav-pills nav-inline',
								'theme_location' => 'primary',
							) );
						?>
					</nav><!-- .main-navigation -->
				</div><!-- .menu -->
		</div><!-- .secondary -->
	<?php endif; ?>
