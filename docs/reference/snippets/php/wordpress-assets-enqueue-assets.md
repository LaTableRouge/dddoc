# Enqueue des assets front/back front & back

```php
/*
 * ================================ Enqueue Front
 * Theme frontend style
 * Theme frontend scripts
 * Theme frontend libs
 */
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script(
        'aos',
        get_stylesheet_directory_uri() . '/assets/lib/aos/aos.js',
        [],
        '3.0.0',
        true
    );
    wp_enqueue_style(
        'aos',
        get_stylesheet_directory_uri() . '/assets/lib/aos/aos.css',
        [],
        '3.0.0'
    );

    // Theme style
    $front_theme_style = wp_get_environment_type() === 'production' ? '/assets/css/front/style.min.css' : '/assets/css/front/style.css';
    wp_enqueue_style(
        'h5_theme_style',
        get_stylesheet_directory_uri() . $front_theme_style,
        []
    );

    // Theme scripts
    $front_theme_script = wp_get_environment_type() === 'production' ? '/assets/js/dist/scripts.umd.ba.js' : '/assets/js/dist/scripts.umd.js';
    wp_register_script(
        'h5_theme_script',
        get_stylesheet_directory_uri() . $front_theme_script,
        ['jquery', 'wp-i18n'], // Libraries to use
        true
    );
}, 20);

/*
 * ================================ Enqueue Back
 * Theme backend style
 * Theme backend scripts
 * Theme backend libs
 */
add_action('admin_enqueue_scripts', function() {
    Theme backend style
    $back_theme_style = wp_get_environment_type() === 'production' ? '/assets/css/back/wp-admin.min.css' : '/assets/css/back/wp-admin.css';
    wp_enqueue_style(
        'h5_theme_style',
        get_stylesheet_directory_uri() . $back_theme_style,
        []
    );
});

/*
 * ================================ Enqueue Back & Front
 * Theme frontend & backend style
 * Theme frontend & backend scripts
 * Theme frontend & backend libs
 */
function h5_theme_enqueue_front_back() {
    // Pass parameters to javascript
    wp_localize_script(
        'h5_theme_script',
        'wp_params',
        [
            'ajax_url' => admin_url('admin-ajax.php'),
            'stylesheet_directory' => get_stylesheet_directory_uri(),
        ]
    );
    wp_enqueue_script('h5_theme_script');
}
add_action('wp_enqueue_scripts', 'h5_theme_enqueue_front_back', 20);
add_action('admin_enqueue_scripts', 'h5_theme_enqueue_front_back');
```
