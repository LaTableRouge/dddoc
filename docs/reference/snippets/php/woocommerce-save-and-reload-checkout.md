# Sauvegarde et récupération des champs renseignés dans le checkout

Permet de garder en session les champs renseignés dans les informations de facturation ( et plus si d'autres champs ont été ajoutés).

## Sauvegarde :
```php
function XXX_save_checkout_values($posted_data) {
    parse_str($posted_data, $output);
    WC()->session->set('checkout_data', $output);
}
add_action('woocommerce_checkout_update_order_review', 'XXX_save_checkout_values', 9999);
```

## Récupération :
```php
function XXX_get_saved_checkout($value, $index) {
    $data = WC()->session->get('checkout_data');
    if (!$data || empty($data[$index])) {
        return $value;
    }

    return is_bool($data[$index]) ? (int) $data[$index] : $data[$index];
}
add_filter('woocommerce_checkout_get_value', 'XXX_get_saved_checkout', 9999, 2);
```

Doc : https://www.businessbloomer.com/woocommerce-retain-checkout-data-reload/