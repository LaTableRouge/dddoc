# Code Editor

In this guide, we will walk through setting up your code editor (Visual Studio Code) and configure it for PHP, Laravel, WordPress, Git, and Docker projects.

## 1. Install Visual Studio Code

Visual Studio Code (VSCode) is a lightweight and powerful source code editor that runs on your desktop.

It is highly customizable, with built-in support for Git, as well as a rich ecosystem of extensions for various programming languages and tools.

### Steps to install VSCode:

1. Visit the official [Visual Studio Code download page](https://code.visualstudio.com/Download).
2. Download the installer for your operating system (Windows, macOS, or Linux).
3. Run the installer and follow the on-screen instructions to complete the installation.
4. Once installed, launch VSCode.

### Additional Resources

- [Getting started with Visual Studio Code](https://code.visualstudio.com/docs/getstarted/introvideos)

## 2. Essential Extensions for VSCode

To enhance your productivity when working with Git, Docker, PHP, Laravel, and WordPress, we recommend installing the following VSCode extensions.

- **EditorConfig**: [VSCode EditorConfig Plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### Git and Version Control

- **GitLens**: Supercharges the Git capabilities in VSCode. It allows you to view Git blame annotations, file history, and even visualize code authorship using Git in your workspace.
  - [GitLens Extension](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

- **Git Graph**: A visual representation of your Git repository's history, allowing you to visualize branches, commits, and merges.
  - [Git Graph Extension](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

### Docker

- **Docker Extension**: Provides a great integration for Docker. It helps manage containers, images, and Docker Compose directly from VSCode.
  - [Docker Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

### PHP Development

- **PHP Intelephense**: A fast and intelligent PHP language server that provides features such as auto-completion, IntelliSense, go-to definitions, and real-time error checking.
  - [PHP Intelephense Extension](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)

- **PHP Debug**: Adds support for debugging PHP code using Xdebug. It allows you to set breakpoints, inspect variables, and navigate through your code step by step.
  - [PHP Debug Extension](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)

### Laravel Development

- **Laravel Blade Snippets**: Provides syntax highlighting and snippets for Laravel Blade templates, making it easier to work with Blade's templating engine.
  - [Laravel Blade Snippets Extension](https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-blade)

- **Laravel Artisan**: Adds support for running Artisan commands directly within VSCode, allowing you to quickly execute tasks like migrations, routing, and model creation.
  - [Laravel Artisan Extension](https://marketplace.visualstudio.com/items?itemName=ryannaddy.laravel-artisan)

### WordPress Development

- **WordPress Snippets**: Provides commonly used snippets for WordPress development, helping you quickly scaffold template files, enqueue scripts, and manage hooks.
  - [WordPress Snippets Extension](https://marketplace.visualstudio.com/items?itemName=wordpresstoolbox.wordpress-toolbox)

### Other Useful Extensions

- **Prettier - Code Formatter**: Ensures consistent code formatting across your projects by automatically formatting code on save.
  - [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- **ESLint**: If you work with JavaScript or Node.js, ESLint helps you identify and fix problems in your JavaScript code.
  - [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 3. Recommended Workspace Settings

Once you have installed VSCode and the necessary extensions, it’s a good idea to set up a few workspace configurations to streamline your workflow.

- **Auto-formatting on Save**: Enable this in your workspace settings to ensure that code is always properly formatted.
  - Open `settings.json` in your workspace and add:
    ```json
    {
      "editor.formatOnSave": true
    }
    ```