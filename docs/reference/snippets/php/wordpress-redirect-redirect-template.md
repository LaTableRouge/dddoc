# Redirect un template vers un autre

Dans cet exemple l'accès aux single du CPT "team" est redirigé vers l'archive de ce même CPT

```php
function h5_redirect_team_single() {
    if (is_singular('team')) {
        wp_safe_redirect(get_post_type_archive_link('team'));
        exit;
    }
}
add_action('template_redirect', 'h5_redirect_team_single');
```
