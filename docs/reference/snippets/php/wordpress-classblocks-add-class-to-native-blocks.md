# Ajouter une classe sur des blocks natifs gutenbergs

```php
add_filter('render_block_core/paragraph', function ($block_content) {
    $p = new WP_HTML_Tag_Processor($block_content);

    if ($p->next_tag()) {
        $p->add_class('wp-block-paragraph');
        if ($p->next_tag('a')) {
            $p->add_class('wp-block-paragraph__link');
        }
    }

    return $p->get_updated_html();
});

add_filter('render_block_core/list', function ($block_content) {
    $list = new WP_HTML_Tag_Processor($block_content);

    if ($list->next_tag()) {
        $list->add_class('wp-block-list');
    }

    return $list->get_updated_html();
});
```
