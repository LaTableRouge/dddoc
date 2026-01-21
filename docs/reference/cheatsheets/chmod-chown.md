# Cheatsheet: Chmod et Chown

## Changer le chmod

1. D'un fichier

```bash
# Changer le CHMOD d'un fichier
sudo chmod 664 filename.php
```

2. D'uniquement tous les dossiers (mais pas les fichiers)
```bash
# Changer le CHMOD d'uniquement tous les dossiers (mais pas les fichiers)
sudo find /path/to/base/dir -type d -exec chmod 755 {} +
```

3. D'uniquement tous les fichiers (mais pas les dossiers)
```bash
# Changer le CHMOD d'un fichier
sudo find /path/to/base/dir -type f -exec chmod 664 {} +
```
## Changer le chown

1. Changer le chown sur tous les enfants d'un dossier (dossiers + fichiers)

```bash
# Changer le CHMOD de tous les enfants d'un dossier (dossiers + fichiers)
sudo chown www-data:www-data <NOM_DU_DOSSIER> -R
```
