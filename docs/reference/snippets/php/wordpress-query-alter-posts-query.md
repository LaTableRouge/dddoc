# Alter post query on specific page

```php
function pre_get_posts($query) {
    if (!is_admin() && $query->is_main_query() && is_post_type_archive(['your-custom-post-type-slug', 'your--othercustom-post-type-slug'])) {
        $query->set('posts_per_page', -1);

        return;
    }
}
add_action('pre_get_posts', 'pre_get_posts');
```
