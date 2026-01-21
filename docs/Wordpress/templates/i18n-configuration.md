# I18n (!!nécessite wp-cli)

!! Ne pas appeler le text domain à l'aide d'une constante, cela peut nuire à la génération des pots

Ici le text domain est **highfive**

## Commandes

- **Lancer un build avant toute commande de traduction**
- **Puis se positionner dans le dossier du thème**

- Générer le .pot

  ```bash
  wp i18n make-pot . lang/highfive.pot --domain=highfive --exclude=node_modules,vendor,lang --include=*.php,blocks,build
  ```

- Générer les json pour le js

  ```bash
  wp i18n make-json lang/ --no-purge
  ```

## Fichiers

 - Les traductions du php sont appelées

    ```php
    function h5_theme_setup() {
        load_child_theme_textdomain('highfive', get_stylesheet_directory() . '/lang');
    }
    add_action('after_setup_theme', 'h5_theme_setup', 20);
    ```

 - Les traductions du js sont appelées

    ```php
    wp_set_script_translations(
        '{handle-de-votre-script}',
        'highfive',
        get_stylesheet_directory() . '/lang'
    );
    ```
