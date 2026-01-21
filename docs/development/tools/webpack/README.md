# 🐱‍👓 Webpack (config front exemple Wordpress)

## Documentation complète

La documentation complète se trouve ici : [Documentation Webpack (front)](\\server\path\to\Documentation Webpack (front).docx)

## Configuration

1. Copier les fichiers webpack.js & package.json du dossier correspondant au type de projet sur lequel vous allez développer 

2. Copier les fichiers du dossier à la racine du projet (excepté le README.md, si vous devez développer sur Laravel, veuiller ne pas prendre les fichiers [.php-cs-fixer.php](.configs/.php-cs-fixer.php) & [composer.json](composer.json))

2. Lancer la commande :

   ```bash
   npm install && composer install && npm run build
   ```

## Commandes

- **Compilation globale**

  - **Development**

    - **Compile** les fichiers du type renseignés dans la ligne de commande (si aucun type de fichier n'est renseigné tous les assets seront compilés)

    - ```bash
      npm run dev:{scss|js}
      ```

  - **Watcher**

    - Compile le scss au moindre changement

    - Compile le js au moindre changement

    - Recharge le navigateur à la fin de chaque compilation

    - ```bash
      npm run watch
      ```

  - **Production**

    - **Compile & minifie** les fichiers du type renseignés dans la ligne de commande (si aucun type de fichier n'est renseigné tous les assets seront compilés)

    - ```bash
      npm run prod:{scss|js}
      ```

  - **Lint**

    - Lint les fichiers du type renseignés dans la ligne de commande

    - ```bash
    npm run lint:{scss|js|php}
      ```

  - **Prettier**

    - Lint les fichiers du type renseignés dans la ligne de commande

    - ```bash
      npm run prettier:{scss|js}
      ```

  - **Optimize**
  
    - Optimise les fichiers du type renseignés dans la ligne de commande
  
    - ```bash
      npm run optimize:{picture}
      ```
  
  - **Version**
  
    - Versionne l'appel des assets dans les fichiers sélectionnés
  
    - ```bash
      npm run version
      ```
  
  - **Clean**
  
    - Clean les fichiers sélectionnés
  
    - ```bash
      npm run clean
      ```
  
  - **Copy**
  
    - Copy des fichiers d'un dossier vers un autre dossier
  
    - ```bash
      npm run copy
      ```
  
  - **Build**
  
    - Lance un lint sur le scss
  
    - Lance un prettier sur le scss
  
    - Lance un lint sur le js
  
    - Lance un prettier sur le js
  
    - Lance un lint sur le php
  
    - Compile le scss et génère un fichier minifié
  
    - Compile le js et génère un fichier minifié
  
    - Clean les fichiers php (ex : remove des "var_dumps")
    
    - Versionne les fichiers qui appellent les assets
    
    - Minifie les images
    
    - Copie les fichiers compilés ainsi que les assets nécessaires dans le dossier **[dist](./dist)** (peux faciliter la mise en production)
    
    - ```bash
      npm run build
      ```


## Liste des fonctionnalités du compilateur

- Style lint
- ES lint
- Prettier
- PHP CS FIXER
- Hot reload (browsersync)
- Compilation JS
- Compilation SCSS
- Minification des images
- Versionning
- Clean du php (remove des var_dump)
- Copy des assets
