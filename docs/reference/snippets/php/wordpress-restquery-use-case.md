# Exemple d'utilisation des requètes à l'api rest de Wordpress

```php
// Variables à passer au js
$rest_url = esc_url_raw(get_rest_url(null, '/wp/v2'));
$rest_nonce = wp_create_nonce('wp_rest');
$posts_per_page = get_option('posts_per_page');
```

```js
const nonce = $rest_nonce; // valeur à récupérer du php
const restUrl = $rest_url; // valeur à récupérer du php
const perPage = $posts_per_page; // valeur à récupérer du php

// Parameters to pass
const params = {
    nonce: nonce,
    _embed: "", // Permet de récupérer les images des posts
    per_page: perPage,
    page: 1,
};

fetch(`${restUrl}/posts?${new URLSearchParams(params)}`)
    .then(async (response) => {
        const totalPages = response.headers.get("x-wp-totalpages");

        const posts = await response.json();

        console.log(posts);
        console.log(`${posts.length} posts into ${totalPages} pages`);
    })
    .catch((err) => {
        console.error(`${err} - Erreur ajax`);
    })
    .finally(() => {
        console.log("Ajax Rest Query end");
    });
```
