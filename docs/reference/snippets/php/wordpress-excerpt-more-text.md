# Wordpress change the default [...] excerpt more with an elipsis

You might add the filter for a specific block and remove it after the block so it doesn't alter the whole website

```php
if(!function_exists('postsBlockExcerptMore')) {
    function postsBlockExcerptMore($more) {
        return '&hellip;';
    }
}
add_filter('excerpt_more', 'postsBlockExcerptMore');


remove_filter('excerpt_more', 'postsBlockExcerptMore');
```
