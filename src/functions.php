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

 function theme_modify_head_scripts() {
   wp_register_script( 'modernizr', get_stylesheet_directory_uri() . '/js/libs/modernizr.js',
      array(), '2.8.3', false );
    wp_register_script( 'typography', get_stylesheet_directory_uri() . '/js/typography.js',
      array('jquery'), '0.7.0', true );

   wp_enqueue_script( 'modernizr' );
   wp_enqueue_script( 'typography' );
 }
 add_action( 'wp_enqueue_scripts', 'theme_modify_head_scripts' );

 function theme_typekit_fonts() {
   wp_register_script( 'theme_typekit', '//use.typekit.net/kyi0gmx.js', array(), '', false );
   wp_enqueue_script( 'theme_typekit' );
 }
 add_action( 'wp_enqueue_scripts', 'theme_typekit_fonts' );

 function theme_typekit_inline() {
   if ( wp_script_is( 'theme_typekit', 'done' ) ) { ?>
     <script type="text/javascript">try{Typekit.load({ async: true });}catch(e){}</script>
    <?php
  }
 }
add_action( 'wp_head', 'theme_typekit_inline' );

 function kap_remove_page_templates( $templates ) {
   unset( $templates['page-templates/archive.php'] );
   unset( $templates['page-templates/single.php'] );
   return $templates;
 }
 add_filter( 'theme_page_templates', 'kap_remove_page_templates' );