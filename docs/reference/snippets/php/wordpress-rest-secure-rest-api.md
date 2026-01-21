# Sécure l'accès à l'api REST de Wordpress via un nonce préalablement établi

```php
// Créer un nonce
wp_create_nonce('wp_rest')


/*
 * ================================
 *  Condition access to REST API
 */
add_filter('rest_authentication_errors', function ($errors) {
    $route = $GLOBALS['wp']->query_vars['rest_route'];

    if (str_contains($route, '/wp/v2/')) {
        if (!is_user_logged_in()) {
            if (!isset($_REQUEST['nonce'])) {
                return new WP_Error(
                    'rest_not_logged_in',
                    __('Paramètre nonce manquant dans la requête'),
                    ['status' => 401]
                );
            } else {
                if (!wp_verify_nonce($_REQUEST['nonce'], 'wp_rest')) {
                    return new WP_Error(
                        'rest_not_logged_in',
                        __('Paramètre nonce incorrect dans la requête'),
                        ['status' => 401]
                    );
                }
            }
        }
    }

    return $errors;
});
```
