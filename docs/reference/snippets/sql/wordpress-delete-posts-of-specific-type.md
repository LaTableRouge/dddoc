# Sélectionner / Supprimer tout les posts d'un post type

🔺 Attention, bien vérifier le préfix des tables avant de lancer la commande 🔺

```sql
SELECT ID, post_title
FROM `wp_posts`
WHERE post_type = 'your-post-type'
```

```sql
DELETE
FROM `wp_posts`
WHERE post_type = 'your-post-type'
```

