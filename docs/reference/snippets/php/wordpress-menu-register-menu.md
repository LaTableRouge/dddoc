# Register custom menu locations

```php
function frontendMenus() {
    $locations = [
        'Main sub menu' => __('Sous-menu principal', 'textdomain'),
        'Langues menu' => __('Menu des langues', 'textdomain'),
        'Compétences' => __('Menu des compétences', 'textdomain'),
        'Footer menu' => __('Menu pied-de-page', 'textdomain'),
        'Social network menu' => __('Menu des réseaux sociaux', 'textdomain')
    ];
    register_nav_menus($locations);
}
add_action('init', 'frontendMenus');
```
