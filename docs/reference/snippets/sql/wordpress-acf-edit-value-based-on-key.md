# Éditer des valeurs d'un champs acf en passant par sa clé

🔺 Attention, bien vérifier le préfix des tables avant de lancer la commande 🔺

```sql
UPDATE `wp_postmeta`
SET meta_value = 'new_value'
WHERE meta_key = 'your_acf_key' AND meta_value LIKE 'old_value';
```
