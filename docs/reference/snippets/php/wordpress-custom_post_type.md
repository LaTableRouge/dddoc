# Creation d'un custom Post Type

-   Création d'un custom post type VOITURES ( associé à la custom taxonomy marque dans l'exemple (non obligatoire) )
    [Lien doc wordpress avec toutes les options possibles ](https://developer.wordpress.org/reference/functions/register_post_type/)

```php
function h5_create_custom_post_type() {
    // Set UI labels for Custom Post Type
    $labels = [
        'name' => _x('Voitures', 'Post Type General Name', TEXT_DOMAIN),
        'singular_name' => _x('Voiture', 'Post Type Singular Name', TEXT_DOMAIN),
        'menu_name' => __('Voitures', TEXT_DOMAIN),
        'all_items' => __('Toutes les voitures', TEXT_DOMAIN),
        'view_item' => __('Voir les voitures', TEXT_DOMAIN),
        'add_new_item' => __('Ajouter une voiture', TEXT_DOMAIN),
        'add_new' => __('Ajouter', TEXT_DOMAIN),
        'edit_item' => __('Editer la voiture', TEXT_DOMAIN),
        'update_item' => __('Mettre à jour la voiture', TEXT_DOMAIN),
        'search_items' => __('Rechercher une voiture', TEXT_DOMAIN),
        'not_found' => __('Non trouvé', TEXT_DOMAIN),
        'not_found_in_trash' => __('Non trouvé dans la corbeille', TEXT_DOMAIN),
    ];

    // Set other options for Custom Post Type
    $args = [
        'label' => __('Voitures', TEXT_DOMAIN),
        'description' => __('Voitures', TEXT_DOMAIN),
        'labels' => $labels,
        // Features this CPT supports in Post Editor
        'supports' => ['title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields'],
        // Possibilité d'associer ce cpt avec une/plusieurs taxonomy ou une/plusieurs custom taxonomies
        //'taxonomies' => ['marques', 'couleurs'],
        'taxonomies' => 'marques',
        /* A hierarchical CPT is like Pages and can have
        * Parent and child items. A non-hierarchical CPT
        * is like Posts.
        */
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_in_admin_bar' => true,
        'menu_icon' => 'NOM_DASHICON', // https://developer.wordpress.org/resource/dashicons/
        'menu_position' => 5,
        'has_archive' => true,
        'exclude_from_search' => false,
        'capability_type' => 'post',
        'show_in_rest' => true,
    ];

    // Registering your Custom Post Type
    register_post_type('voitures', $args);
}

// Hook into the 'init' action so that the function containing our post type registration is not unnecessarily executed.
add_action('init', 'h5_create_custom_post_type', 0);
```
