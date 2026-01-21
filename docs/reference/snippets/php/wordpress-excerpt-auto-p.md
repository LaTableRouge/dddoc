# Wordpress remove the automatic p tag from excerpt

You might remove the filter for a specific block and add it after the block so it doesn't alter the whole website

```php
remove_filter('the_excerpt', 'wpautop');

add_filter('the_excerpt', 'wpautop');
```
