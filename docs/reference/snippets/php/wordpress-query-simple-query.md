# A simple WP Query

```php
$query = new WP_Query([
    'post_type' => 'posts',
    'posts_per_page' => -1,
    'meta_query' => [
        'relation' => 'AND',
        [
            'key' => 'your_acf_key',
            'value' => ['true', true],
            'compare' => 'IN',
        ]
    ]
]);

if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        
        // Do Smthng
    }
}
```
