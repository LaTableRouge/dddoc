# Override le nombre maximal de query executé par GraphQL


```php
add_filter('graphql_connection_max_query_amount', function($amount, $source, $args, $context, $info) {
    $amount = 1000; // increase post limit to 1000

    return $amount;
}, 10, 5);
```
