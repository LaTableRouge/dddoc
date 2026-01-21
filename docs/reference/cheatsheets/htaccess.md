# Cheatsheet: .htacess

Compilation rapide d'instructions à utiliser dans un fichier .htaccess pour le serveur Apache (équipé de [mod_rewrite](https://httpd.apache.org/docs/2.4/fr/rewrite/)).

## Bloquer l'accès à une ressource

```apache
RedirectMatch 404 .git
RedirectMatch 404 /dossier/
```

## Rediriger HTTP vers HTTPS

```apache
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
```

## Redirections

```apache
RedirectPermanent /home /?lang=en [L]
```

Vers un site externe

```apache
RedirectPermanent /formations https://formations.example.org/ [L]
```

Ajouter un slash final (il faut utiliser un regexp ici, un simple /ecrire provoquera une boucle infinie)

```apache
RedirectPermanent "^/ecrire$" /ecrire/ [L]
```

Suppprimer un slash final

```apache
RedirectMatch "^\/notre-societe\/$" "/notre-societe" [L]
```

Rediriger un chemin

```apache
RedirectMatch "^\/page\/(.*)" "/autre/chemin/$1" [L]
```

Un domaine (ou un ensemble de domaines) vers un autre

```apache
RewriteEngine on
RewriteCond %{HTTP_HOST} ^example.fr [OR]
RewriteCond %{HTTP_HOST} ^www.example.fr
RewriteRule ^(.*)$ https://www.example.com/$1 [R=301,NC,L]
```

## Réécriture

```apache
RewriteEngine on
```

On ignore la query string qui vient après `?` dans la règle.

```apache
RewriteRule "^page.php$" /home/www/page/page.php [L]
# Va aussi répondre à page.php?article3 ou page.php?page=truc
```

Un chemin

```apache
RewriteRule ^img/(.*)$ /home/www/autre/chemin/img/$1 [L]
```

Une url

```apache
RewriteRule ^notre-societe$ /home/www/autre/page/notre-societe [L]
```

Tout réécrire sauf une condition

```apache
RewriteCond %{REQUEST_URI} !^/page\.php.*
RewriteRule ^(.*)$ /home/www/wordpress/public/$1 [L
```

## Robots : empêcher l'indexation

```apache
Header set X-Robots-Tag "noindex, noarchive"
```

## Enlever l'extension des fichiers dans l'url

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.]+)$ $1.php [NC,L]
```
