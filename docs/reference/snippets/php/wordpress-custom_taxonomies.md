# Creation d'une custom taxonomy

[Lien doc wordpress avec toutes les options possibles ](https://developer.wordpress.org/reference/functions/register_taxonomy/)

-   Création d'une custom taxonomy MARQUE associée au cpt VOITURES

```php
/**
 * Créer une taxonomy MARQUE pour un custom post type VOITURE
 *
 * @see register_post_type() for registering custom post types.
 */
function h5_custom_taxo_name() {
    $labels = [
        'name' => _x('Marques','taxonomy general name',TEXT_DOMAIN),
        'singular_name' => _x('Marque','taxonomy singular name',TEXT_DOMAIN),
        'search_items' => __('Chercher une marque',TEXT_DOMAIN),
        'all_items' => __('Toutes les marques',TEXT_DOMAIN),
        'edit_item' => __('Editer la marque',TEXT_DOMAIN),
        'update_item' => __('Mettre à jour la marque',TEXT_DOMAIN),
        'add_new_item' => __('Ajouter une marque',TEXT_DOMAIN),
        'new_item_name' => __('Nom de la nouvelle marque',TEXT_DOMAIN),
        'menu_name' => __('Marques',TEXT_DOMAIN),
    ];

    $args = [
        'hierarchical' => true,
        'labels' => $labels,
        'show_in_rest' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'marques'],
    ];

    register_taxonomy('marques','voitures', $args);
    //Il est possible d'associer cette taxonomy à plusieurs CPT en déclarant d'autre cpt (motos ici)
    //register_taxonomy( 'marques',['voitures', 'motos'], $args );
}
// hook into the init action and call h5_custom_taxo_name when it fires
add_action('init', 'h5_custom_taxo_name', 0);
```
