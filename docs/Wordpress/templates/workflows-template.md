# Wordpress Ci template

Pour plus d'informations pour setup la CI via les Github actions voir la [Guideline](../Guidelines-ci.md)

## Arborescence Requise sur le Serveur pour le Déploiement via GitHub Actions

Lorsque vous utilisez GitHub Actions pour automatiser le déploiement de votre application, il est essentiel de disposer d'une arborescence correcte sur le serveur de destination.

Cette arborescence doit être organisée de manière à ce que le processus de déploiement puisse fonctionner sans problème.

Voici une structure d'arborescence typique que vous pouvez suivre sur votre serveur :

```text
/
├── var                             # root du projet peux varier en fonction de la configuration du serveur
│   ├── artifacts                   # Répertoire pour les artefacts de déploiement
│   ├── www
│   │   ├── current                 # Lien symbolique vers la release active
│   │   ├── releases                # Répertoire des releases
│   │   │   ├── static              # Fichiers statiques
│   │   │   │   ├── wp-config.php
│   │   │   │   ├── .htaccess
│   │   │   │   ├── uploads         # Dossier qui va contenir les uploads
│   │   │   │   ├── languages       # Dossier qui va contenir les traductions
│   │   │   │   ├── themes
│   │   │   │   │   ├── twentytwentythree  # Thème par défaut de WordPress
│   │   │   ├── 291ff10072a50d4fb3e383d7e710c965259beb46  # Hash de la release
│   │   │   │   ├── wp-content
│   │   │   │   │   ├── themes
│   │   │   │   │   │   ├── twentytwentythree  # Lien symbolique vers le dossier de thème par défaut statique
│   │   │   │   │   ├── uploads     # Lien symbolique vers le dossier d'uploads statique
│   │   │   │   │   ├── languages   # Lien symbolique vers le dossier de langues statique
│   │   │   │   │   └── ...         # Autres fichiers et dossiers WordPress
│   │   │   │   ├── .htaccess       # Lien symbolique vers le fichier .htaccess statique
│   │   │   │   ├── wp-config.php   # Lien symbolique vers le fichier wp-config.php statique
│   │   │   │   ├── ...             # Autres fichiers de configuration
│   │   │   ├── ...                 # Autres releases
└── ...
```

**Explications** :

- `/var/artifacts` : C'est le répertoire où vous stockez les artefacts de déploiement, généralement sous forme d'archives.

- `/var/www/current` : Il s'agit d'un lien symbolique qui pointe vers la release active.

Vous pouvez le mettre à jour pour basculer vers une nouvelle release une fois le déploiement terminé.

- `/var/www/releases` : C'est le répertoire où vous stockez toutes les releases précédentes.

Chaque release est organisée dans un sous-répertoire portant un hash, ce qui permet de garder une trace de l'historique des déploiements.

- `/var/www/releases/static` : C'est l'emplacement où vous stockez les fichiers statiques de votre application, tels que les traductions, uploads, wp-config.php ou .htaccess.

‼‼ important ‼‼ vous devez vous-mêmes uploader sur le serveur les fichiers/dossiers correspondant à l'arborescence `www/releases/static`

- `/var/www/releases/{hash}` : Chaque sous-répertoire correspond à une release spécifique.

L'arborescence à l'intérieur de chaque release contient l'ensemble du git excepté les fichiers nécéssaires au développement
(.scss, node_modules etc.).

Des liens symboliques sont créés lors de l'activation de la release : 
    - Lien symbolique du dossier uploads
    - Lien symbolique du dossier languages
    - Lien symbolique du dossier themes/twentytwentythree
    - Lien symbolique du fichier wp-config.php
    - Lien symbolique du fichier .htaccess

## Script de déploiement fonctionnel

**Notes** :
- Le déploiement manuel via Github ne fonctionne que si un fichier de workflow est pushé sur la branche principale (main|master) avec la ligne `workflow_dispatch` dedans
- Ce script ne fonctionne qu'avec les sites Wordpress
- ‼‼ **Pensez à faire pointer le nom de domaine sur le lien symoblique `current`** ‼‼

```yaml
name: Votre nom de script de déploiement
on:
  push:
    branches: ['release/demo-deploy']
  workflow_dispatch:

jobs:
  # Build & zip le Wordpress entier dans une archive "release"
  build:
    name: Build website
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Compile CSS and Javascript
        run: |
          npm ci
          npm run prod --chore=ci

      - name: Create deployment artifact
        env:
          GITHUB_SHA: ${{ github.sha }}
          THEME_NAME: 'highfive'
        run: |
          theme_files=(
            "wp-content/themes/${THEME_NAME}/assets"
            "wp-content/themes/${THEME_NAME}/components/**/js"
            "wp-content/themes/${THEME_NAME}/components/**/scss"
          )

          configuration_files=(
            package.json
            package-lock.json
            composer.json
            composer.lock
            wp-config.php
            README.md
            commitlint.config.js
            git-precommit-checks.config.js
            vite.config.js
            .browserslistrc
            .editorconfig
            .php-cs-fixer.php
            .stylelintignore
            .stylelintrc.json
            .prettierrc.js
            .prettierignore
            .eslintrc.js
            .eslintignore
          )

          development_folders=(
            *.git
            .husky
            node_modules
            scripts
            vendor
          )

          excluded_args=""
          for file in "${theme_files[@]}" "${configuration_files[@]}" "${development_folders[@]}"; do
            excluded_args+=" --exclude=$file"
          done

          tar -czf "${GITHUB_SHA}".tar.gz --anchored $excluded_args *

      - name: Store artifact for distribution
        uses: actions/upload-artifact@v3
        with:
          name: app-build
          path: ${{ github.sha }}.tar.gz

  # Dézippe la release sur le serveur
  prepare-release-on-servers:
    name: 'Prepare release'
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: app-build
      - name: Upload
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          source: ${{ github.sha }}.tar.gz
          target: ${{ secrets.PATH }}/artifacts

      - name: Extract archive and create directories
        uses: appleboy/ssh-action@master
        env:
          GITHUB_SHA: ${{ github.sha }}
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          envs: GITHUB_SHA
          script: |
            mkdir -p "${{ secrets.PATH }}/www/releases/${GITHUB_SHA}"
            tar xzf ${{ secrets.PATH}}/artifacts/${GITHUB_SHA}.tar.gz -C "${{ secrets.PATH}}/www/releases/${GITHUB_SHA}"

  # Pas vraiment utile mais c'est bien de l'avoir
  run-before-hooks:
    name: 'Before hook'
    runs-on: ubuntu-latest
    needs: [prepare-release-on-servers]
    steps:
      - name: Run before hooks
        uses: appleboy/ssh-action@master
        env:
          GITHUB_SHA: ${{ github.sha }}
          RELEASE_PATH: ${{ secrets.PATH }}/www/releases/${{ github.sha }}
          ACTIVE_RELEASE_PATH: ${{ secrets.PATH }}/www/current
          BASE_PATH: ${{ secrets.PATH }}
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME}}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT}}
          envs: GITHUB_SHA,RELEASE_PATH,ACTIVE_RELEASE_PATH,BASE_PATH
          script: |
            echo before activating release

  # Lie l'endroit ou pointe le serveur vers le nouveau dossier de release
  # Lie le dossier upload avec le nouveau dossier de release
  # Lie le dossier languages avec le nouveau dossier de release
  # Lie le dossier du thème backup avec le nouveau dossier de release
  # Lie l'htaccess avec le nouveau dossier de release
  # Lie le wp-config avec le nouveau dossier de release
  activate-release:
    name: 'Activate release'
    runs-on: ubuntu-latest
    needs: [prepare-release-on-servers, run-before-hooks]
    steps:
      - name: Activate release
        uses: appleboy/ssh-action@master
        env:
          GITHUB_SHA: ${{ github.sha }}
          BASE_PATH: ${{ secrets.PATH }}
          RELEASE_PATH: ./releases/${{ github.sha }}
          ACTIVE_RELEASE_PATH: ${{ secrets.PATH }}/www/current
          ACTIVE_WP_CONTENT_PATH: ${{ secrets.PATH }}/www/releases/${{ github.sha }}/wp-content
          UPLOADS_PATH: ../../static/uploads/
          LANG_PATH: ../../static/languages/
          BACKUP_THEME_PATH: ../../../static/themes/twentytwentythree/
          HTACCESS_PATH: ../static/.htaccess
          WP_CONFIG_PATH: ../static/wp-config.php
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME}}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT}}
          envs: GITHUB_SHA,BASE_PATH,RELEASE_PATH,ACTIVE_RELEASE_PATH,ACTIVE_WP_CONTENT_PATH,UPLOADS_PATH,LANG_PATH,BACKUP_THEME_PATH,HTACCESS_PATH,WP_CONFIG_PATH
          script: |
            cd $BASE_PATH/www
            ln -s -n -f $RELEASE_PATH $ACTIVE_RELEASE_PATH
            cd $ACTIVE_WP_CONTENT_PATH
            ln -s -n -f $UPLOADS_PATH ./uploads
            ln -s -n -f $LANG_PATH ./languages
            cd $ACTIVE_WP_CONTENT_PATH/themes
            ln -s -n -f $BACKUP_THEME_PATH ./twentytwentythree
            cd $ACTIVE_RELEASE_PATH
            ln -s -n -f $HTACCESS_PATH .htaccess
            ln -s -n -f $WP_CONFIG_PATH wp-config.php

  # Pas vraiment utile mais c'est bien de l'avoir
  run-after-hooks:
    name: 'After hook'
    runs-on: ubuntu-latest
    needs: [prepare-release-on-servers, run-before-hooks, activate-release]
    steps:
      - name: Run after hooks
        uses: appleboy/ssh-action@master
        env:
          GITHUB_SHA: ${{ github.sha }}
          RELEASE_PATH: ${{ secrets.PATH }}/www/releases/${{ github.sha }}
          ACTIVE_RELEASE_PATH: ${{ secrets.PATH }}/www/current
          BASE_PATH: ${{ secrets.PATH }}
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME}}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT}}
          envs: GITHUB_SHA,RELEASE_PATH,ACTIVE_RELEASE_PATH,BASE_PATH
          script: |
            echo after activating release

  # Ne garde que les deux dernières releases & artifacts (en date)
  # Dans le dossier /releases/ ne supprime que les dossier qui ne sont pas 'static'
  clean-up:
    name: 'Clean up'
    runs-on: ubuntu-latest
    needs: [prepare-release-on-servers, run-before-hooks, activate-release, run-after-hooks]
    steps:
      - name: Run after hooks
        uses: appleboy/ssh-action@master
        env:
          RELEASES_PATH: ${{ secrets.PATH }}/www/releases
          ARTIFACTS_PATH: ${{ secrets.PATH }}/artifacts
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME}}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT}}
          envs: RELEASES_PATH,ARTIFACTS_PATH
          script: |
            cd $RELEASES_PATH && ls -d -t -1 */ | grep -v "static" | tail -n +3 | xargs rm -rf
            cd $ARTIFACTS_PATH && ls -t -1 | tail -n +3 | xargs rm -rf

```
