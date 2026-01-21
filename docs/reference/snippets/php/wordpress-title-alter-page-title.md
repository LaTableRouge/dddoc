# Change le titre d'une page

```php
add_filter('pre_get_document_title', function($title) {
    if (is_post_type_archive('collaborateurs')) {
        $title = __("L'humain");
    }

    return $title;
}, 9999);
```
