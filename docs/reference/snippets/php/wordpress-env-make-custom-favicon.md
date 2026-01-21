# Wordpress make custom favicon based on environment

```php
/*
* ================================ Make env favicon
*/
function h5_make_env_favicon() {
    $env = wp_get_environment_type();

    //Create custom ENV favicon folder
    if (!is_dir(get_stylesheet_directory() . '/assets/img/favicon/env')) {
        wp_mkdir_p(get_stylesheet_directory() . '/assets/img/favicon/env', 0775, true);
    }

    // Make custom ENV favicon
    if (!file_exists(get_stylesheet_directory() . '/assets/img/favicon/env/favicon-' . $env . '.png')) {
        $faviconServerPath = get_stylesheet_directory() . '/assets/img/favicon/favicon-16x16.png';
        if (file_exists($faviconServerPath)) {
            $faviconUrlPath = get_stylesheet_directory_uri() . '/assets/img/favicon/favicon-16x16.png';
            $stampPath = 'https://dev.example.com/favicon-for-dev/' . $env . '.png';
            $response = get_headers($stampPath, 1);
            $file_exists_stamp = (strpos($response[0], '404') === false);
            $themePath = explode('favicon-16x16.png', $faviconServerPath);

            if ($file_exists_stamp) {
                $stamp = imagecreatefrompng($stampPath);
                $customFavicon = imagecreatefrompng($faviconUrlPath);

                $marge_right = 0;
                $marge_bottom = 0;
                $sx = imagesx($stamp);
                $sy = imagesy($stamp);
                imagecopy($customFavicon, $stamp, imagesx($customFavicon) - $sx - $marge_right, imagesy($customFavicon) - $sy - $marge_bottom, 0, 0, imagesx($stamp), imagesy($stamp));
                imagepng($customFavicon, get_stylesheet_directory() . '/assets/img/favicon/env/favicon-' . $env . '.png', 9);
                imagedestroy($customFavicon);
            }
        }
    }
    if (file_exists(get_stylesheet_directory() . '/assets/img/favicon/env/favicon-' . $env . '.png')) { ?>
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/favicon/env/favicon-<?php echo $env ?>.png">
<?php }
    }

if (wp_get_environment_type() !== 'production') {
    add_action('wp_head', 'h5_make_env_favicon');
    add_action('admin_head', 'h5_make_env_favicon');
}
```
