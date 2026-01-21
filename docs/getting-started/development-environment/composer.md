# Composer

Composer is a dependency manager for PHP, designed to handle project dependencies, making it easy to manage packages and keep them up to date. 
This guide provides explanations for using composer.

## Important files & folders

### The composer.json file

The `composer.json` file is a configuration file for Composer, the PHP dependency manager, that defines the dependencies, configurations, and metadata required for a PHP project.

This file allows developers to specify exactly which packages their project relies on, set version constraints, define autoloading, and configure project-specific settings.

### The composer.lock file

The `composer.lock` file is a crucial file in PHP projects managed by Composer, as it records the exact versions of dependencies that were installed during the last update or installation.

While `composer.json` defines the desired dependencies with possible version ranges, `composer.lock` locks in those specific versions, ensuring consistent installations across all environments.

:::danger
Never remove `composer.lock` file and never directly edit the file
:::

### The vendor folder

The vendor folder is a crucial component of PHP projects that use Composer, the dependency manager for PHP. This directory is automatically created when you install or update packages using Composer.

It serves as a storage location for all the third-party libraries and packages that your project depends on. Here's a detailed explanation of its structure, purpose, and significance in a PHP application.

## Purpose of the vendor Folder

**Dependency Management:** The vendor folder contains all the packages that your project requires, as specified in your `composer.json` file. This includes both direct dependencies and their sub-dependencies.

**Isolation of Dependencies:** By storing packages in the vendor directory, Composer isolates third-party libraries from your project's source code.

This separation helps prevent conflicts between different projects that might require different versions of the same library.

**Autoloading:** Composer generates an autoload file located at vendor/autoload.php, which is responsible for autoloading all classes in the dependencies.

Including this file in your project makes it easy to use classes from the installed packages without manually including each file.

:::danger
Never edit or commit content vendor folder
:::

## Structure of the vendor Folder


The vendor directory typically has the following structure:

```text
vendor/
├── autoload.php
├── composer/
│   ├── ClassMapGenerator.php
│   ├── InstalledVersions.php
│   ├── ...
├── monolog/
│   └── monolog/
│       ├── src/
│       ├── README.md
│       └── ...
├── guzzlehttp/
│   └── guzzle/
│       ├── src/
│       ├── README.md
│       └── ...
└── ...
```

## Commands

### Composer install

- Installs dependencies based on the `composer.lock` file in `vendor` directory
- If `composer.lock` is absent, it creates it based on the `composer.json` file.
- Use this command when setting up an existing project for the first time or when updating dependencies in a production environment.

When to use composer install:

- On first setup of a project.
- In CI/CD pipelines and production environments to ensure consistency.
- When switching between branches in a project to install dependencies that match the branch-specific `composer.lock`.

**Command :**

```bash
composer install
```

### Composer update

- Updates dependencies based on the version constraints specified in `composer.json`.
- Generates a new `composer.lock` file, updating it with new dependency versions.
- Only use this command when you intentionally want to update dependencies or modify version constraints.
  
**When to use composer update:**

- When adding a new package to the project, as it updates the `composer.lock` to include the new dependency.
- When updating specific packages (e.g., composer update monolog/monolog).
- In development environments when you need the latest compatible versions.
- To modify `composer.json` constraints and update versions accordingly.

**Commands :**

- **Update one specific package :**

```bash
composer update monolog/monolog
```

This updates only the monolog/monolog package to the latest version allowed by its version constraint defined in `composer.json`. Other dependencies remain unchanged.

- **Update multiple packages :**

```bash
composer update monolog/monolog symfony/symfony
```

- **Update all packages :**

```bash
composer update
```

### Composer require

The `composer require` command is a fundamental feature of Composer, that allows you to add new dependencies to your project easily.

It modifies the ``composer.json`` file to include the specified package and its version constraint, and it also updates the `composer.lock` file.

This ensures that the specific versions of the dependencies are installed.

**Commands** :

- **Adding a Package Without a Specific Version**

```bash
composer require monolog/monolog
```

This command adds the latest stable version of the monolog/monolog package to the project.

The `composer.json` file will be updated to include the package under the require section, and the corresponding entry will be added to the `composer.lock` file.

- **Adding a Package with a Specific Version**

```bash
composer require monolog/monolog:^2.0
```

This command adds the monolog/monolog package with the version constraint ^2.0. This means Composer will install the latest version that is compatible with 2.0 (i.e., 2.x versions, but not 3.0).

- **Adding a Development Dependency**

```bash
composer require --dev phpunit/phpunit
```

The --dev flag indicates that phpunit/phpunit should be added to the require-dev section of the `composer.json` file. This is useful for tools needed only during development, such as testing frameworks.

- **Specifying Multiple Packages**

```bash
composer require monolog/monolog guzzlehttp/guzzle
```

- **Adding a Package with a Specific Stability**

```bash
composer require monolog/monolog:dev-master
```

This command adds a package with a specific stability version, such as dev-master.

This can be useful for testing the latest development version of a package, but caution is advised, as development versions may be unstable.

### Composer remove

The `composer remove` command is used to remove a package from your PHP project that is currently managed by Composer.

This command not only removes the specified package from your project but also updates the `composer.json` and `composer.lock` files accordingly.

It ensures that your project's dependencies are clean and that the package is no longer included in your project's dependencies.

**Commands** :

- **Removing a Single Package**

```bash
composer remove monolog/monolog
```

This command removes the monolog/monolog package from your project.

It will update the require section of `composer.json` to no longer include the package, and the corresponding entry will be removed from `composer.lock`.

- **Removing Multiples Packages**

```bash
composer remove monolog/monolog guzzlehttp/guzzle
```

## Versions constraints

### Exact Version: Installs a specific version

**Example:**

`"monolog/monolog": "2.0.2"`

**Meaning:** Only version 2.0.2 of Monolog will be installed, with no updates possible.

### Wildcard (*): Allows any version within a major, minor, or patch range

**Example:**

 `"monolog/monolog": "2.*"`

**Meaning:** Any 2.x version of Monolog will be installed, like 2.1, 2.5, or even 2.99.

**Other Examples:**

`"monolog/monolog": "2.1.*"`

**Meaning:** allows 2.1.0, 2.1.3, etc.

`"monolog/monolog": "*"`

**Meaning:** allows any version and install the higher one.

### Caret (^): Allows updates for non-breaking changes according to Semantic Versioning

**Example:**

`"monolog/monolog": "^2.0"`

**Meaning:** Installs version 2.0 or higher, but only up to (and not including) 3.0. This range includes 2.0.1, 2.5.3, 2.99.0, etc.

**Caret with Minor Versions:**

**Example:**

`"monolog/monolog": "^2.1.3"` 

**Meaning:** allows updates up to but not including 3.0, so it includes versions like 2.1.4, 2.2.0, but stops before 3.0.

**Caret with Pre-1.0 Versions:**

### Example

`"monolog/monolog": "^0.3"`

**Meaning:** allows versions from 0.3 up to, but not including, 1.0.

`"monolog/monolog": "^0.3.2"`

**Meaning:** allows updates up to, but not including, 0.4.0.

### Tilde (~): Allows updates within a minor version range

**Example:**

`"monolog/monolog": "~2.0"`

**Meaning:** Installs 2.0 or any version up to (but not including) 3.0, but it does not allow major version changes.


**Other Examples:**

`"monolog/monolog": "~2.1.3"`

**Meaning:** allows updates up to but not including 2.2.0. This includes 2.1.4, 2.1.9, etc., but stops before 2.2.

### Comparison Operators `(<, <=, >, >=, !=)`: Sets precise version boundaries

Examples:

`"monolog/monolog": ">=2.0"`

**Meaning:** Allows version 2.0 or higher.

`"monolog/monolog": "<3.0"`

**Meaning:** Allows any version below 3.0.

`"monolog/monolog": "!=2.0.5"`

**Meaning:** Excludes version 2.0.5.

**Combination:** `"monolog/monolog": ">=2.0 <3.0"` 

**Meaning:** allows any version in the 2.x series.

### Hyphenated Range: Specifies a version range

**Example:**

`"monolog/monolog": "2.0 - 2.3"`

**Meaning:** Installs versions from 2.0 up to and including 2.3, covering minor updates only.

### Logical Operators (||): Allows multiple version constraints.

**Example:**

`"monolog/monolog": "^1.5 || ^2.0"`

**Meaning:** Installs any version compatible with either 1.5 or 2.0, allowing flexibility across major versions.

## Key sections of `composer.json`

- **require**

Specifies the main dependencies needed for the project to run, often with version constraints.

```json
"require": {
  "monolog/monolog": "^2.0"
}
```

- **require-dev**
  
Lists dependencies required only in development, such as testing libraries or debugging tools.

```json
"require-dev": {
  "phpunit/phpunit": "^9.0"
}
```

- **autoload**

Defines autoloading rules, specifying where to find classes or functions in the project. This can include PSR-4, PSR-0, or classmap standards for autoloading.

```json
"autoload": {
  "psr-4": {
    "App\\": "src/"
  }
}
```

- **scripts**
  
Allows the automation of tasks, such as running tests or clearing caches, by defining custom Composer commands.

```json
"autoload": {
  "psr-4": {
    "App\\": "src/"
  }
}
```

- **config**

Configures Composer’s behavior, such as setting the preferred installation method or minimum stability of packages.

```json
"config": {
  "preferred-install": "dist",
  "optimize-autoloader": true
}
```

- **extra**

Contains custom project-specific settings or metadata used by certain packages.

## Full `composer.json` example

```json
{
    "name": "example-site/project-main",
    "type": "project",
    "homepage": "https://example.com/",
    "repositories": [
        {
            "type": "composer",
            "url": "https://gitlab.example.com/api/v4/group/35/-/packages/composer/packages.json",
            "canonical": false
        },
        {
            "type": "composer",
            "url": "https://wpackagist.org",
            "only": [
                "wpackagist-plugin/*",
                "wpackagist-theme/*"
            ]
        },
        {
            "type": "composer",
            "url": "https://gitlab.example.com/api/v4/group/36/-/packages/composer/packages.json"
        }
    ],
    "require": {
        "php": ">=8.0",
        "composer/installers": "*",
        "vlucas/phpdotenv": "*",
        "oscarotero/env": "*",
        "roots/bedrock-autoloader": "*",
        "roots/bedrock-disallow-indexing": "*",
        "roots/wordpress": "*",
        "roots/wp-config": "*",
        "roots/wp-password-bcrypt": "*",
        "wpackagist-theme/twentytwentyfour": "*",
        "friendsofphp/php-cs-fixer": "*",
        "example/composer-required-wordpress": "*",
        "wpackagist-plugin/wp-sentry-integration": "*",
        "wpackagist-plugin/redis-cache": "*",
        "example/cloudflare-cache": "*",
        "example/lazy-loader": "*",
        "wpackagist-plugin/advanced-cron-manager": "*",
        "example/akismet": "*",
        "example/classic-editor": "*",
        "wpackagist-plugin/conditional-menus": "*",
        "wpackagist-plugin/custom-post-type-sticky": "*",
        "wpackagist-plugin/easy-table-of-contents": "*",
        "wpackagist-plugin/favicon-by-realfavicongenerator": "*",
        "wpackagist-plugin/fsm-custom-featured-image-caption": "*",
        "wpackagist-plugin/hd-quiz": "*",
        "wpackagist-plugin/wp-user-avatar": "*",
        "wpackagist-plugin/re-add-underline-justify": "*",
        "wpackagist-plugin/remove-xmlrpc-pingback-ping": "*",
        "example/smart-post-show-pro": "*",
        "wpackagist-plugin/table-of-contents-plus": "*",
        "example/tao-schedule-update": "*",
        "wpackagist-plugin/icon-block": "*",
        "wpackagist-plugin/wordfence": "*",
        "wpackagist-plugin/youtube-embed-plus": "*",
        "example/audit-seo": "*",
        "example/auto-last-updated": "*",
        "example/bookmakers": "*",
        "example/contact-form-honey": "*",
        "example/couponst": "*",
        "example/default-featured-image": "*",
        "example/favicon-default-avatar": "*",
        "example/gutenberg-acf-block": "*",
        "example/gutenberg-blocks": "*",
        "example/daext-live-events": "*",
        "example/shortcodes": "*",
        "example/sportslogic": "*",
        "example/offuscation-link": "*",
        "example/plugin-update-checker": "*",
        "example/pretty-link": "*",
        "example/retargetting": "*",
        "example/short-title": "*",
        "example/table-maker": "*",
        "example/table-maker-beauty-table-add-on": "*",
        "example/tmce-turf": "*",
        "example/tips-shortcode": "*",
        "example/specific-overrides-project": "*",
        "wpackagist-theme/twentytwenty": "*",
        "wpackagist-theme/twentytwentyone": "*",
        "wpackagist-theme/twentytwentythree": "*",
        "wpackagist-theme/twentytwentytwo": "*",
        "wpackagist-plugin/query-monitor": "*",
        "wpackagist-plugin/wp-optimize": "*",
        "example/flex-mag": "*",
        "wpackagist-plugin/imagify": "^2.2",
        "wpackagist-plugin/wordpress-seo": "^23.7"
    },
    "require-dev": {
        "squizlabs/php_codesniffer": "^3.7.1",
        "roave/security-advisories": "dev-latest"
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "allow-plugins": {
            "composer/installers": true,
            "roots/wordpress-core-installer": true
        }
    },
    "minimum-stability": "dev",
    "prefer-stable": true,
    "extra": {
        "installer-paths": {
            "web/app/mu-plugins/{$name}/": [
                "type:wordpress-muplugin"
            ],
            "web/app/plugins/{$name}/": [
                "type:wordpress-plugin"
            ],
            "web/app/themes/{$name}/": [
                "type:wordpress-theme"
            ]
        },
        "wordpress-install-dir": "web/wp"
    },
    "scripts": {
        "test": [
            "phpcs"
        ]
    },
    "description": "Composer configuration for the WordPress site.",
    "license": "proprietary"
}

```