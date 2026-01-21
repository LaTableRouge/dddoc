# Faire une meta query basé sur un champ acf à l'intérieur d'un repeater


```php
add_filter('posts_where', function($where) {
    $where = str_replace("meta_key = 'repeaterkey_$", "meta_key LIKE 'repeaterkey_%", $where);

    return $where;
});

$args = [
    'post_type' => 'yourPostType',
    'meta_query' => [
        [
            'key' => 'repeaterkey_$_repeateritemkey',
            'value' => 'valueToCompare',
            'compare' => '='
        ]
    ]
];
$loop = new WP_Query($args);
while ($loop->have_posts()) {
    $loop->the_post();
    // Do loop content
}
wp_reset_postdata();
```
