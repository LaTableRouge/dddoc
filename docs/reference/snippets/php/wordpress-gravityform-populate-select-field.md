# Population dynamique d'un champ type select dans gravity form par custom query

Dans le formulaire gravityform, sur le champ à populer, aller dans Avancé -> Remplir dynamiquement les champs et renseigner un nom de paramètre ( ici: product_name )

```php
function gf_populate_from_cpt($form) {

    foreach ($form['fields'] as &$field) {

        // Selectionner le champ à populer. Remplacer product_name par le paramètre renseigné dans le formulaire
        if ($field['type'] != 'select' || strpos($field['inputName'], 'product_name') === false)
            continue;
        // Parametres de la query pour fonction get_posts

        $args = array(
            'numberposts' => -1,
            'post_status' => 'publish',
            'orderby' => 'title',
            'order' => 'ASC',
            'post_type' => 'product', // Choisir cpt et les 

        //Possibilité d'ajouter des taxos, etc c'est une query classique. Idem pour des meta pour filtrer par acf.

        );

        $posts = get_posts($args);

        // Le premier choix de la liste
        $choices = array(array('text' => '-- Choisir un produit --', 'value' => ' '));

        // On boucle sur tous les posts de notre custom query, et on ajoute le titre de chaque post dans la liste
        foreach ($posts as $post) {
            $choices[] = array('text' => wptexturize($post->post_title), 'value' => wptexturize($post->post_title));
        }

        $field['choices'] = $choices;
    }

    return $form;
}
add_filter('gform_pre_render_[FORM_ID]', 'gf_populate_from_cpt');

```
