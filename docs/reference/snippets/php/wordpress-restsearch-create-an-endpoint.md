# Create a Rest API endpoint to search posts in Wordpress

```php
function getSearchDataCallback($restQuery) {
    // Récupère les paramètres de la query REST
    $restQueryParams = $restQuery->get_params();

    // Scope le blog
    if (!empty(isset($restQueryParams['blog']))) {
        switch_to_blog($restQueryParams['blog']);
    }

    // Query les posts en fonction des paramètres passé dans l'url de la query
    $queryArgs = [];
    if (!empty(isset($restQueryParams['s']))) {
        $queryArgs['s'] = $restQueryParams['s'];
    }
    $queryArgs['post_type'] = !empty(isset($restQueryParams['post_type'])) ? $restQueryParams['post_type'] : 'any';
    $queryArgs['posts_per_page'] = !empty(isset($restQueryParams['per_page'])) ? $restQueryParams['per_page'] : -1;
    $queryArgs['paged'] = !empty(isset($restQueryParams['page'])) ? $restQueryParams['page'] : 1;
    $query = new WP_Query($queryArgs);

    // Création d'un array qui va contenir uniquement les données voulues
    $posts_data = [];
    // Boucle sur les résultats de la query
    if (!empty($query->have_posts())) {

        $target_url = '/';
        $this_url = site_url();

        while ($query->have_posts()) {
            $query->the_post();

            $post = (object) [];
            $post->searchData = [];

            $id = get_the_ID();

            $content = get_the_content();
            // Push post content into search results
            if ($content > '') {
                // Replace wp site url with target url
                $content = str_replace($this_url, $target_url, $content);
                $post->searchData[] = $content;
            }

            // Push all acf fields into search results
            if (function_exists('get_fields')) {
                $fields = get_fields($id);
                if ($fields) {
                    $iterator = new RecursiveIteratorIterator(new RecursiveArrayIterator($fields));
                    foreach ($iterator as $value) {
                        if (
                            $value !== null && $value !== '' &&   // check for empty strings
                            strlen($value) > 50 &&                  // remove small strings like button titles etc.
                            substr($value, 0, 4) !== 'http'        // remove links
                        ) {
                            // Replace wp site url with target url
                            $content = str_replace($this_url, $target_url, $value);
                            $post->searchData[] = $content;
                        }
                    }
                }
            }

            $post->pathname = str_replace($this_url, '', get_permalink($id));

            $posts_data[] = $post;
        }
        wp_reset_postdata();
    }else{
        return new WP_Error(
            'rest_not_found',
            esc_html__('No posts found'),
            ['status' => 404]
        );
    }

    // Restore le scope du blog
    if (!empty(isset($restQueryParams['blog']))) {
        restore_current_blog();
    }

    $response = rest_ensure_response($posts_data);
    $response->header('X-WP-Total', $query->found_posts);
    $response->header('X-WP-TotalPages', $query->max_num_pages);

    return $response;
}

add_action('rest_api_init', function () {
    register_rest_route(
        'wp/v2',
        '/highfive/searchPosts',
        [
            'methods' => WP_REST_Server::READABLE,
            'callback' => 'getSearchDataCallback',
            'validate_callback' => function($restQuery) {
                //  Récupère les paramètres de la query REST
                $restQueryParams = $restQuery->get_params();

                if(!empty(isset($restQueryParams['post_type']))) {
                    if (!is_string($restQueryParams['post_type'])) {
                        return new WP_Error(
                            'query_validate_error',
                            __('The parameter "post_type" should be a string'),
                            ['status' => 401]
                        );
                    }
                }

                if(!empty(isset($restQueryParams['per_page']))) {
                    if (!is_numeric($restQueryParams['per_page'])) {
                        return new WP_Error(
                            'query_validate_error',
                            __('The parameter "per_page" should be a numeric value'),
                            ['status' => 401]
                        );
                    }
                }

                if(!empty(isset($restQueryParams['page']))) {
                    if (!is_numeric($restQueryParams['page'])) {
                        return new WP_Error(
                            'query_validate_error',
                            __('The parameter "page" should be a numeric value'),
                            ['status' => 401]
                        );
                    }
                }

                if(!empty(isset($restQueryParams['blog']))) {
                    if (!is_numeric($restQueryParams['blog'])) {
                        return new WP_Error(
                            'query_validate_error',
                            __('The parameter "blog" should be a numeric value'),
                            ['status' => 401]
                        );
                    }
                }

                return $restQuery;
            },
            'sanitize_callback' => function($restQuery) {
                return $restQuery;
            },
            'permission_callback' => function ($result) {
                // Note: Remove this check if you already have a nonce check in your theme
                if (!is_user_logged_in()) {
                    if (!isset($_REQUEST['nonce'])) {
                        return new WP_Error(
                            'rest_not_logged_in',
                            __('Missing nonce in the request'),
                            ['status' => 401]
                        );
                    } else {
                        if (!wp_verify_nonce($_REQUEST['nonce'], 'wp_rest')) {
                            return new WP_Error(
                                'rest_not_logged_in',
                                __('Incorrect nonce in the request'),
                                ['status' => 401]
                            );
                        }
                    }
                }

                return $result;
            }
        ]
    );
});
```

```js
// Ne pas oublier d'utiliser le "nonce" afin de sécuriser l'endpoint voir -> [wordpress][rest] - secure rest api.md
fetch('your rest api url')
    .then(response => response.json())
    .then((response) => {
        console.log(response)
    })
```
