<?php
/**
 * kap-twenty-fifteen-child functions and definitions
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 */

 function modify_wp_head() {
   remove_action( 'wp_head',             'rsd_link'                               );
   remove_action( 'wp_head',             'wlwmanifest_link'                       );
   remove_action( 'wp_head',             'print_emoji_detection_script',     7    );
   remove_action( 'wp_head',             'rel_canonical'                          );
   remove_action( 'wp_head',             'wp_site_icon',                    99    );
  //  remove_action( 'wp_footer',           'wp_print_footer_scripts',         20    );
 }
 add_action( 'init', 'modify_wp_head' );

 function dequeue_parent_styles() {
   wp_dequeue_style( 'twentyfifteen-fonts' );
   wp_dequeue_style( 'twentyfifteen-ie7' );
 }
 add_action( 'wp_enqueue_scripts', 'dequeue_parent_styles', 20 );

 function theme_enqueue_styles() {

     $parent_style = 'parent-style';

     wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
     wp_enqueue_style( 'child-style',
         get_stylesheet_directory_uri() . '/style.css',
         array( $parent_style )
     );
 }
 add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

 function theme_modify_head_scripts() {
   wp_register_script( 'modernizr', get_stylesheet_directory_uri() . '/js/libs/modernizr.js',
      array(), '2.8.3', false );
    wp_register_script( 'typography', get_stylesheet_directory_uri() . '/js/typography.js',
      array('jquery'), '0.7.0', true );

   wp_enqueue_script( 'modernizr' );
   wp_enqueue_script( 'typography' );
   wp_enqueue_script( 'underscore' );
   wp_enqueue_script( 'backbone' );
 }
 add_action( 'wp_enqueue_scripts', 'theme_modify_head_scripts' );

 function theme_prevent_fout() {
    echo '<script type="text/javascript">document.documentElement.className += " wf-loading";</script>';
 }
 add_action( 'wp_head', 'theme_prevent_fout' );

 function kap_remove_page_templates( $templates ) {
   unset( $templates['page-templates/archive.php'] );
   unset( $templates['page-templates/single.php'] );
   return $templates;
 }
 add_filter( 'theme_page_templates', 'kap_remove_page_templates' );

 function kap_filter_archive_title ( $title ) {

    if( is_category() ) {
      $title = single_term_title( '', false );

    } elseif ( is_post_type_archive() ) {
      $title = post_type_archive_title( '', false );

    }

    return $title;
  }
  add_filter( 'get_the_archive_title', 'kap_filter_archive_title' );

  function modify_read_more_link() {
    return '<a class="more-link" href="' . get_permalink() . '">[See more &hellip;]</a>';
  }
  add_filter( 'the_content_more_link', 'modify_read_more_link' );
