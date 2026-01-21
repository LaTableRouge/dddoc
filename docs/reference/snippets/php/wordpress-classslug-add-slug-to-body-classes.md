# Add page slug to body classes

```php
function add_slug_body_class($classes) {
    global $post;
    if (isset($post)) {
        $classes[] = $post->post_type . '__' . $post->post_name;
    }

    return $classes;
}
add_filter('body_class', 'add_slug_body_class');
```
