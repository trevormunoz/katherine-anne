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

	<?php if ( ! is_home() ) : ?>
		<header class="site-logo">
			<h1>
        <a href="/">Katherine Anne Porter <span class="main">Correspondence</span></a>
      </h1>
		</header><!-- .site-logo -->
	<?php endif; ?>
