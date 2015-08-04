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
   remove_action( 'wp_head',             'wp_print_head_scripts',            9    );
   remove_action( 'wp_head',             'rel_canonical'                          );
   remove_action( 'wp_head',             'wp_site_icon',                    99    );
 }
 add_action( 'init', 'modify_wp_head' );

 function dequeue_parent_styles() {
   wp_dequeue_style( 'twentyfifteen-fonts' );
   wp_dequeue_style( 'genericons' );
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

 function kap_remove_page_templates( $templates ) {
   unset( $templates['page-templates/archive.php'] );
   unset( $templates['page-templates/single.php'] );
   return $templates;
 }
 add_filter( 'theme_page_templates', 'kap_remove_page_templates' );
