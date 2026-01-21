# Wordpress login page customisation

```php
/*
 * ================================
 *  Login page - Logo, link, title, text
 */
add_action('login_enqueue_scripts', function() {
    $img = get_stylesheet_directory_uri() . '/assets/img/login-logo.png';
    $img_size = getimagesize($img);
    ?>
    <style type="text/css">
        #login h1 a,
        .login h1 a {
            background-image: url('<?php echo $img; ?>');
            width: <?php echo $img_size[0]; ?>px;
            height: <?php echo $img_size[1]; ?>px;
            background-size: 100%;
        }
    </style>
    <?php

    add_filter('login_headerurl', function () {
        return home_url();
    });

    add_filter('login_headertext', function () {
        return get_option('blogname');
    });
});
```
