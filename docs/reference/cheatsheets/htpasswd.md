# Cheatsheet: .htpasswd

1. Ajouter à la racine du site un fichier php nommé `show-path.php` contenant :

    ```php
    <?php echo dirname(__FILE__) . '/.htpasswd'; ?>
    ```

2. Accéder au fichier sur votre site `www.site.fr/show-path.php` et copier l'adresse affichée.

   C'est le chemin complet de la racine du site sur le serveur.

3. Ajouter dans le htaccess :

    ```apache
    AuthUserFile [Adresse precedement copiée]/.htpasswd
    AuthType Basic
    AuthName "Authentification"
    Require valid-user
    ```

4. Se rendre https://www.web2generators.com/apache-tools/htpasswd-generator

   Renseigner un Username, un Password et cliquer sur "Generate .htpasswd file".

   Créer une entrée dans le trousseau avec le site, le nom d utilisateur, et le mot de passe en mettant htaccess en nom de service.

   Copier la ligne générée de type : ` Nom_utilisateur:$apr1$o3htr569$W8D95MkyuTfBmMlxidUR01`

   Créer un fichier `.htpasswd` à la racine du site, au même niveau que le `.htaccess` et y coller la ligne générée.

5. Supprimer le fichier `show-path.php` du serveur

6. Aller sur le site pour tester si le mot de passe fonctionne bien
