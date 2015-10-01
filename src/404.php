<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage KAP Correspondence
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

      <section class="error-404">
  			<header class="entry-header">
  				<h1 class="entry-title">
            <?php _e( 'Return to Sender', 'katherine-anne' ); ?>
          </h1>
  			</header><!-- .entry-header -->
        <div class="entry-content-container">
    			<div class="entry-content">
    				<p>
              <?php _e( 'We can&rsquo;t deliver you to the page you requested. Try again?', 'katherine-anne' ); ?>
            </p>
						<p><a href="/introduction"><?php _e('Home', 'katherine-anne'); ?></a></p>
    			</div><!-- .entry-content -->
        </div><!-- .entry-content-container -->
      </section><!-- .error-404 -->

		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>
