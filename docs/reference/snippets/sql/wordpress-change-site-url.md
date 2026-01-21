# Change Wordpress site URL in BDD

🔺 Attention, bien vérifier le préfix des tables avant de lancer la commande 🔺

```sql
UPDATE wp_options SET option_value = replace(option_value, 'https://local.library.fr', 'http://local.library.fr') 
WHERE option_name = 'home' OR option_name = 'siteurl';
UPDATE wp_posts SET guid = replace(guid, 'https://local.library.fr','http://local.library.fr');
UPDATE wp_posts SET post_content = replace(post_content, 'https://local.library.fr', 'http://local.library.fr'); 
UPDATE wp_postmeta SET meta_value = replace(meta_value,'https://local.library.fr','http://local.library.fr');
```

