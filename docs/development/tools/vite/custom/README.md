# 💦 Vite (config front exemple Custom)

- [Example](https://github.com/example/project-example)

## Install dependencies

Éxécuter les commandes suivantes :

```bash
npm install && composer install
```

<br/>

## Setup files

### File **[vite.config.js](./vite.config.js)** setup

Change the value of "const url" with your local url project, in file [vite.config.js](./vite.config.js).

The list of entry files are defined in the [vite.config.js](./vite.config.js) file in the variable "entryFiles".

### Main php file **[index.php](index.php)** setup

1. Copy the files from the folder [includes](./assets/includes).
2. Require the [vite.inc.php](./assets/includes/vite.inc.php) file.
3. Call the assets
    - Styles : "vite_enqueue_style('path/to/your/scss/styles/file');
    - Scripts : "vite_enqueue_script('path/to/your/js/scripts/file');

<br/>

### Tests the development scripts

Run the following command : 

```bash
npm run build
```

<br/>

### Optional

You can specify files to copy inside the build folder to have a ready to go production build, see this [Example](https://github.com/example/project-example)

## Commands

### npm run watch

1. Change PHP constant "IS_VITE_DEVELOPMENT" to "true" in [variables.inc.php](./assets/includes/variables.inc.php) file.
2. Compile assets listed in the variable "entryFiles" in the [vite.config.js](./vite.config.js) file.
3. Refresh pages on JS change OR inject scss directly in the page

### npm run prod

1. Create a build folder in the theme with the assets fully compiled and fonts, pictures (if called in the assets)
2. Change PHP constant "IS_VITE_DEVELOPMENT" to "false" in [variables.inc.php](./assets/includes/variables.inc.php) file.

### npm run build

1. Run prettier for scss, lint for scss, prettier for js, lint for js and lint for php
2. Create a build folder in the theme with the assets fully compiled and fonts, pictures (if called in the assets)
3. Change PHP constant "IS_VITE_DEVELOPMENT" to "false" in [variables.inc.php](./assets/includes/variables.inc.php) file.
