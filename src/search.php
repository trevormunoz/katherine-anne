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

			<div class="search-facets">
			  <div class="facet-toolbar">
			    <div class="facet-label all active">All</div>
			    <div class="facet-group">
						<div class="facet-group-label">Filter: </div>
			      <div class="facet-label">Date</div>
			      <div class="facet-label">Location</div>
			      <div class="facet-label">Recipient</div>
			    </div>
			  </div>
			  <div class="facet-body-container">
			    <!-- insert facet content -->
			  </div>
			</div><!-- .search-facets -->
			<div class="search-results">
				<!-- insert result list -->
				<div class="empty-search">No Results</div>
			</div><!-- .search-results -->
			<button type="button" class="btn search-button disabled">Next</button>
		</main><!-- .site-main -->
	</section><!-- .content-area -->

<?php get_footer(); ?>
