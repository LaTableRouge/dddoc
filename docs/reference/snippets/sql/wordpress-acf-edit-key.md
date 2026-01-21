# Éditer la clé d'un champ acf

🔺 Attention, bien vérifier le préfix des tables avant de lancer la commande 🔺

```sql
UPDATE `wp_postmeta` 
SET meta_key = REPLACE(meta_key, 'old_value', 'new_value') 
WHERE meta_key LIKE 'old_value';

UPDATE `wp_postmeta` 
SET meta_key = REPLACE(meta_key, '_old_value', '_new_value') 
WHERE meta_key LIKE '_old_value';
```
