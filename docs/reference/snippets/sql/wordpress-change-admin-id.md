# Changer user avec ID = 1 pour un ID plus compliqué à trouver

🔺 Attention, bien vérifier le préfix des tables avant de lancer la commande 🔺
🔺 Attention BIS , bien sauvegarder la BDD avant de la manipuler 🔺

Remplacer l'ID 1 (créé lors de la premiere installation) par un nombre elevé permet de ralentir la decouverte du compte admin.

L'Id 1 est systematiqueemnt testé par les attaques visant à acceder au back office du site. Idealement, il faut changer les IDs de tous les comptes administrateurs.

```sql
UPDATE PREFIX_users SET ID = 1024 WHERE ID = 1;
UPDATE PREFIX_usermeta SET user_id = 1024 WHERE user_id = 1;
```

