# Exemple d'utilisation des requètes ajax dans Wordpress

```php
// Variables à passer au js
$ajax_url = admin_url('admin-ajax.php');
```

```php
if (!function_exists('ajax_example')) {
    function ajax_example() {
        $id = $_GET['id'];
        
        echo json_encode(
            [
                'id' => $id
            ]
        );
        die();
    }
    add_action('wp_ajax_ajax_example', 'ajax_example'); // Utilisation pour les utilisateurs connectés
    add_action('wp_ajax_nopriv_ajax_example', 'ajax_example'); // Utilisation pour les utilisateurs non connectés
}
```

```js
const ajaxURL = $ajax_url; // valeur à récupérer du php

// Parameters to pass
const params = {
    action: "ajax_example", // Le nom de la fonction que l'on veut appeler
    id: 1, // paramètre exemple à communiquer au php
};

fetch(`${ajaxURL}?${new URLSearchParams(params)}`)
    .then(async (response) => {
        response = await response.json(); // convertion en json si le retour de l'ajax est en json
        response = await response.text(); // convertion en text si le retour de l'ajax est en text/html
        console.log(response);
    })
    .catch((err) => {
        console.error(`${err} - Erreur ajax`);
    })
    .finally(() => {
        console.log("Ajax Rest Query end");
    });
```
