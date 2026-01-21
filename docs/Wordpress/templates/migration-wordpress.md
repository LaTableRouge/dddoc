# Cheatsheet: Migration d'un  site Wordpress

## Migration automatique avec WP Migrate PRO

---
## Migration manuelle
### Récupérer un site en production pour le mettre en local

1. ➡️ **Récupérer la base de donnée sur le serveur de production avec WP Migrate**

   1. Dans l'admin de Wordpress, cliquer sur `Outil` / `WP Migrate`
   2. Ensuite onglet `Migrate`
   3. Puis cliquer sur `Backup Database`
   4. Via le FTP, récupérer dans le fichier `GZ` dans `wp-content/uploads/wp-migrate-db`
   5. Dé-zipper le fichier `GZ` où vous voulez

2. ➡️ **Sauvegarder la BDD local avec WP Migrate**

   1. Dans l'admin de Wordpress, cliquer sur `Outil` / `WP Migrate`
   2. Ensuite onglet `Migrate`
   3. Puis cliquer sur `Backup Database`
   4. Un fichier `GZ` va se créer dans `wp-content/uploads/wp-migrate-db`

3. ➡️ Supprimer les tables de la base de données local (sur http://192.168.1.120/phpmyadmin/)

4. ➡️ **Importer la BDD de prod en local**
   1. Allez dans le dossier précedement dé-zipper dans `l'étape 1-V` et ouvrir le terminal dedans
   2. Rentrez la commande suivante en renommant `nom_de_la_base` et `nom_du_fichier.sql`
      ```bash
      mysql -u remote_user -h 192.168.1.120 nom_de_la_base < nom_du_fichier.sql
      ```
      > **Problème connu après le lancement de la commande :**
      > 
      > ERROR 1273 (HY000) at line 51659: Unknown collation: 'utf8mb4_0900_ai_ci'
      > 
      > Solution : https://tecadmin.net/resolved-unknown-collation-utf8mb4_0900_ai_ci/

   3. Dans le projet, lancez la commande `npm run wp:dbreplace` et suivez les instructions.
      
      Le script va remplacer les URL du site de prod par celle du site en local, dans la BDD local. 
   
      Pour plus de sécurité, le Search and Replace va se lancer en mode `TEST` puis en mode `LIVE`

5. ➡️ **Récupérer les uploads (et autres) du serveur de production**

   Dossiers à récupérer :

   - /wp-content/themes/highfive/acf-json
   - /wp-content/uploads/20*XX*
   - /wp-content/uploads/generateblocks

6. ➡️ **Commitez les dossiers `acf-jon` et `generateblocks` s'ils doivent être commités**
