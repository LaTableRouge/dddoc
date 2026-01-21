# NOM DU PROJET

![PHP Version](https://img.shields.io/badge/php-%5E8.0-7377ad)
![WordPress Version](https://img.shields.io/badge/wordpress-%3E%3D%206.0-2271b1)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2016-84ce24)

## ⚙️ Configuration locale du projet

### Fichiers host et vhost

Dans le dossier `C:\Windows\System32\drivers\etc`, éditer le fichier `host` et y ajouter le nom de domaine du projet local.

```apache
# NOM DU PROJET
127.0.0.1 nomduprojet.local
```

Dans le dossier `C:\laragon\etc\apache2\sites-enabled` créer un fichier `nomduprojet.local.conf`.

Dans ce fichier, coller la configuration suivante et éditer les deux premières lignes avec les informations du projet ( nom de domaine local, chemin d'accès ).

```apache
define ROOT "C:/laragon/www/[DOSSIER DU PROJET]"
define SITE nomduprojet.local

<VirtualHost *:80>
    DocumentRoot "${ROOT}"
    ServerName ${SITE}
    ServerAlias *.${SITE}
    <Directory "${ROOT}">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:443>
    DocumentRoot "${ROOT}"
    ServerName ${SITE}
    ServerAlias *.${SITE}
    <Directory "${ROOT}">
        AllowOverride All
        Require all granted
    </Directory>

    SSLEngine on
    SSLCertificateFile      C:/laragon/etc/ssl/laragon.crt
    SSLCertificateKeyFile   C:/laragon/etc/ssl/laragon.key

</VirtualHost>
```

### Configuration du fichier [wp-config.php](./wp-config.php)

Créer un fichier `wp-config.php` à la racine du projet, coller la configuration suivante puis éditer les Réglages MySQL et Clés secrètes.

```php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en « wp-config.php » et remplir les
 * valeurs.
 *
 * Ce fichier contient les réglages de configuration suivants :
 *
 * Réglages MySQL
 * Préfixe de table
 * Clés secrètes
 * Langue utilisée
 * ABSPATH
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'votre_nom_de_bdd' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'votre_utilisateur_de_bdd' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', 'votre_mdp_de_bdd' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8' );

/**
 * Type de collation de la base de données.
 * N’y touchez que si vous savez ce que vous faites.
 */
define( 'DB_COLLATE', '' );

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'mettez une phrase unique ici' );
define( 'SECURE_AUTH_KEY',  'mettez une phrase unique ici' );
define( 'LOGGED_IN_KEY',    'mettez une phrase unique ici' );
define( 'NONCE_KEY',        'mettez une phrase unique ici' );
define( 'AUTH_SALT',        'mettez une phrase unique ici' );
define( 'SECURE_AUTH_SALT', 'mettez une phrase unique ici' );
define( 'LOGGED_IN_SALT',   'mettez une phrase unique ici' );
define( 'NONCE_SALT',       'mettez une phrase unique ici' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortement recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* Ajoutez toute valeur personnalisée entre cette ligne et la ligne "Bonne publication". */


/* Manage debug mod */
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', true );
define( 'SCRIPT_DEBUG', true );

/* CSS and scripts optimization */
define( 'COMPRESS_CSS', false );
define( 'COMPRESS_SCRIPTS', false );
define( 'CONCATENATE_SCRIPTS',false );
define( 'ENFORCE_GZIP', false );

/* Manage cache */
define( 'WP_CACHE', false );

/* Limit post revision */
define( 'WP_POST_REVISIONS', 10 );

/* Force security rules on HTML and uploads */
define( 'ALLOW_UNFILTERED_UPLOADS', false );
define( 'DISALLOW_UNFILTERED_HTML', true );

/* Keep automatic minor updates of the WordPress core  */
define( 'WP_AUTO_UPDATE_CORE', 'minor' );

/* No file editor in WordPress administration */
define( 'DISALLOW_FILE_EDIT', true );

/* PHP memory for the back-end & the front-end */
define( 'WP_MAX_MEMORY_LIMIT', '640M' );
define( 'WP_MEMORY_LIMIT', '640M' );

/* Define WordPress environment type*/
define( 'WP_ENVIRONMENT_TYPE', 'local' );
define( 'IS_VITE_DEVELOPMENT', true );


/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( ! defined( 'ABSPATH' ) )
  define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once( ABSPATH . 'wp-settings.php' );

```

## 🪄 Scripts de développement

### Installer les dépendances requises

Éxécuter les commandes suivantes :

```bash
npm install && composer install
```

Nous utilisons vite.js pour faciliter et optimiser nos développements.

La liste des scripts de développement est listée ci-dessous :

| Commande NPM  | Action                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| npm run prod  | compile les fichiers du thème highfive (\*.php, \*.scss, \*.js) et déploie les fichiers statiques dans de dossier **dist/** du thème.                                          |
| npm run build | lint, indente et compile les fichiers du thème highfive (\*.php, \*.scss, \*.js) et déploie les fichiers statiques dans de dossier **dist/** du thème.                         |
| npm run watch | démarre un serveur de développement local accessible directement sur **nomduprojet.local**, compile et recharge les fichiers statiques (\*.scss, \*.js) à chaque modification. |
