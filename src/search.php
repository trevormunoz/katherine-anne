<?php
/**
 * The template for displaying search results pages.
	Template Name: Search
 */

get_header(); ?>

	<?php get_template_part( 'site', 'tools' ); ?>

	<section id="primary" class="content-area search">
		<main id="main" class="site-main" role="main">

			<?php get_search_form(); ?>

		</main><!-- .site-main -->
	</section><!-- .content-area -->

<?php get_footer(); ?>
