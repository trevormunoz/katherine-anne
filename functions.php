<?php
/**
 * kap-twenty-fifteen-child functions and definitions
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 */

 function theme_enqueue_styles() {

     $parent_style = 'parent-style';

     wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
     wp_enqueue_style( 'child-style',
         get_stylesheet_directory_uri() . '/style.css',
         array( $parent_style )
     );
 }
 add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

 function kap_remove_page_templates( $templates ) {
   unset( $templates['page-templates/archive.php'] );
   unset( $templates['page-templates/single.php'] );
   return $templates;
 }
 add_filter( 'theme_page_templates', 'kap_remove_page_templates' );
