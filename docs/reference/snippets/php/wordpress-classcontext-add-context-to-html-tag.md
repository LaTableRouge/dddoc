# Add context to html tag element

```php
function h5_add_context_to_html_tag ($output) {
    if (is_admin()) {
        $output .= ' data-context="back"';
    } else {
        $output .= ' data-context="front"';
    }

    return $output;
}
add_filter('language_attributes', 'h5_add_context_to_html_tag');
```
