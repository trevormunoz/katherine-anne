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

	<!-- thin top nav -->
	<?php if ( ! is_home() ) : ?>
		<header>
			<div class="site-logo">
        <a href="/">Katherine Anne Porter <span class="main">Correspondence</span></a>
      </div><!-- .site-logo -->
		</header>
	<?php endif; ?>
