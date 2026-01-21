# WordPress Script Optimizations

To improve the performance of your WordPress site, it's important to optimize the way scripts are loaded.

Below are three key optimizations you can implement: moving scripts to the footer, relocating jQuery to the footer, and disabling the WordPress Emoji script.

---

## **Adding `rel="prefetch"` to Links in WordPress**

By adding `rel="prefetch"`, we hint to the browser to fetch the linked resources in advance, improving page load performance for subsequent navigations.

```php
 function add_prefetch_to_links($content) {
    // Use a regular expression to target <a> tags
    $content = preg_replace_callback(
        '/<a\s+([^>]+)>/i',
        function ($matches) {
            // If the link doesn't already have a rel attribute, add one
            if (strpos($matches[1], 'rel=') === false) {
                return '<a ' . $matches[1] . ' rel="prefetch">';
            }
            // If a rel attribute is present, add "prefetch" to the list
            return '<a ' . str_replace('rel="', 'rel="prefetch ', $matches[1]) . '>';
        },
        $content
    );

    return $content;
}

// Apply to the content of posts/pages
add_filter('the_content', 'add_prefetch_to_links');

// Apply to post excerpts (used on the homepage and archives)
add_filter('the_excerpt', 'add_prefetch_to_links');

// Apply to widget text (in case there are links in text widgets)
add_filter('widget_text', 'add_prefetch_to_links');

// Apply to custom menus (in case menus have links that need prefetch)
add_filter('wp_nav_menu', 'add_prefetch_to_links');
```

By implementing this function, you can optimize the browsing experience of your WordPress site visitors by hinting the browser to prefetch important resources linked in your posts and pages.

---

## **Defer Parsing of JavaScript**

Defer parsing ensures that JavaScript is only loaded after the HTML document has been fully parsed, which helps improve page load times.

```php
function defer_parsing_of_js($url) {
    if ( is_user_logged_in() ) return $url; // Don't apply defer for logged-in users
    if ( FALSE === strpos( $url, '.js' ) ) return $url; // Only apply to .js files
    return str_replace( ' src', ' defer="defer" src', $url );
}
add_filter( 'script_loader_tag', 'defer_parsing_of_js', 10 );
```

This script defers the loading of JavaScript files, except for logged-in users, which can be useful for admins who need real-time access to functionality.

---

## Move All Scripts to the Footer

By default, WordPress loads scripts in the header of the page. Moving them to the footer can improve page load times and overall performance.

```php
function move_all_scripts_to_footer() {
    if ( ! is_admin() ) { // Ensure this doesn't apply in the admin area
        global $wp_scripts;

        // Loop through registered scripts and move them to the footer
        foreach( $wp_scripts->registered as $handle => $script ) {
            if ( $wp_scripts->get_data( $handle, 'group' ) !== 1 ) {
                $wp_scripts->add_data( $handle, 'group', 1 );
            }
        }
    }
}
add_action( 'wp_enqueue_scripts', 'move_all_scripts_to_footer', 100 );
```

This code checks if the user is not in the admin area and moves all scripts to the footer by modifying their "group" property.

It improves page rendering speed by allowing content to load before scripts are executed.

---

## Move jQuery to the Footer

jQuery is commonly used in WordPress themes and plugins, but loading it in the header can delay content rendering. Here's how to move jQuery to the footer:

```php
function move_jquery_to_footer() {
    if ( !is_admin() ) { // Ensure this doesn't apply in the admin area
        wp_deregister_script( 'jquery' ); // Deregister the default jQuery
        
        // Re-register jQuery to load in the footer
        wp_register_script( 'jquery', includes_url( '/js/jquery/jquery.min.js' ), array(), null, true );
        
        wp_enqueue_script( 'jquery' ); // Enqueue jQuery
    }
}
add_action( 'wp_enqueue_scripts', 'move_jquery_to_footer' );
```

In this example, the `wp_deregister_script()` function is used to remove the default jQuery, and `wp_register_script()` re-registers it to load in the footer by setting the last parameter to `true`.

---

## Disable WordPress Emojis

WordPress includes an emoji feature that loads additional scripts and styles, which may be unnecessary. Disabling these scripts can reduce page load times and improve performance.

```php
function disable_wp_emojicons() {
    // Remove emoji scripts and styles from front-end and admin pages
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

    // Remove emoji support from TinyMCE editor
    add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}

function disable_emojicons_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    }
    return array();
}

add_action( 'init', 'disable_wp_emojicons' );
```

This function removes all actions and filters related to emojis from both the front-end and admin sections of WordPress. Additionally, it removes the `wpemoji` plugin from TinyMCE.

---

## **Disable Embeds**

WordPress automatically embeds content like YouTube videos or other URLs into posts, which can add extra JavaScript. Disabling embeds can reduce unnecessary load.

```php
function disable_wp_embeds() {
    // Remove the embed script
    wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'disable_wp_embeds' );
```

This stops the loading of `wp-embed.min.js`, reducing overhead for users who don’t need embedding.

---

## **Disable Dashicons for Non-Admins**

Dashicons are WordPress’s default icon font, which is unnecessary for non-admin users.

```php
function dequeue_dashicon() {
    if ( !is_admin() && !is_user_logged_in() ) {
        wp_deregister_style( 'dashicons' );
    }
}
add_action( 'wp_enqueue_scripts', 'dequeue_dashicon' );
```

This code disables Dashicons for non-logged-in users, reducing unnecessary asset loading for visitors.

---

## Conclusion

Implementing these optimizations can significantly enhance your WordPress site's performance by minimizing unnecessary script loading and ensuring that critical content loads faster.