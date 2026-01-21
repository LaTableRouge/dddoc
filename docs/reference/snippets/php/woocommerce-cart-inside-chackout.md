# Fusionner le panier dans le checkout

Permet de "sauter une étape" dans le process du tunnel de vente.
Dans les réglages de woocommerce, désactiver la page panier.
```php
function XXX_cart_on_checkout_page() {
    echo do_shortcode('[woocommerce_cart]');
}
add_action('woocommerce_before_checkout_form', 'XXX_cart_on_checkout_page', 11);
```

Doc : https://www.businessbloomer.com/woocommerce-cart-checkout-same-page/