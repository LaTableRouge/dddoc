# Génération des tokens necessaires pour connection à Zoho

Creation du Grant token (valable une minute ) à faire depuis zoho pour generer les token d'acces et/ou de refresh
 * cf ce post plus explicite que la doc : https://wpmet.com/doc/zoho/
 * bien penser à utiliser .eu dans l'url et non .com

Exemples avec une page d'options ACF parametrée pour stocker les differents Ids


 ```php
 function generate_refresh_token($url) {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);
    curl_close($ch);
    print_r($response);
    $all_tokens = json_decode($response, true);

    $token = $all_tokens['refresh_token'];
    //print_r($all_tokens);
    update_field('refresh_token', $token, 'options');

    return $token;
}
 ```

 ```php
 function generate_access_token($refresh_url) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $refresh_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);
    curl_close($ch);

    $response = json_decode($response, true);

    $token = $response['access_token'];

    return $token;
}
 ```
Exemple d'utilisation sur CEI :

 ```php 
 function cei_send_participants_to_zoho($postdata) {

    if (class_exists('ACF')) {
        $client_id = get_field('client_id', 'options');
        $client_secret = get_field('client_secret', 'options');
        $refresh_token = get_field('refresh_token', 'options');
    }
    $refresh_url = 'https://accounts.zoho.eu/oauth/v2/token?refresh_token=' . $refresh_token . '&client_id=' . $client_id . '&client_secret=' . $client_secret . '&grant_type=refresh_token';

    $access_token = generate_access_token($refresh_url);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://www.zohoapis.eu/crm/v2/NOM_DU_MODULE'); // possibilité d'ajouter la methode derriere comme UPSERT par exemple. Cf doc zoho
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postdata));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Zoho-oauthtoken ' . $access_token, 'content-type:application/x-www-form-urlencoded']);

    $response = curl_exec($ch);

    $response = json_decode($response);

    return $response;
}
 ```