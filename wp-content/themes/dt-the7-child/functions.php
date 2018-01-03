<?php
function cc_mime_types( $mimes ){
$mimes['svg'] = 'image/svg+xml';
return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );

function adding_custom_scripts() {
    wp_register_script('custom_js_scripts', get_stylesheet_directory_uri() . '/custom.js', array('jquery'), true);
    wp_enqueue_script('custom_js_scripts');
} 

add_action( 'wp_enqueue_scripts', 'adding_custom_scripts', 999 ); 


?>
