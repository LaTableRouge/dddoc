---
id: pre-commit
title: Pre-commit
---

## What is Pre-commit?

Pre-commit is a framework for managing and maintaining multi-language pre-commit hooks.

These hooks are scripts that run automatically during the `git commit` process to ensure code quality, enforce standards, or perform other checks.

### Information

- **How it Works**: Pre-commit runs hooks defined in a configuration file (`.pre-commit-config.yaml`). These hooks can be local or from remote repositories.

Hooks are triggered during the `git commit` process to validate or modify your code before it's committed.
- **Docker Image**: A Docker image is available for running pre-commit hooks:  
  `devops/pre-commit:latest`.
  - **GitLab Repository**: [Pre-commit Docker Image](https://gitlab.example.com/organization/devops/docker-images/pre-commit).

### List of Hooks

Pre-commit supports a wide variety of hooks. For a full list, visit [https://pre-commit.com/hooks.html](https://pre-commit.com/hooks.html). Below are examples of custom hooks you can configure:
#### Basic yml and file checks:
```yaml
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks:
    -   id: check-yaml
    -   id: end-of-file-fixer
    -   id: trailing-whitespace
    -   id: mixed-line-ending
    -   id: check-added-large-files
```
#### PHP CS Fixer and PHPStan

For a comprehensive guide on setting up PHPStan and PHP CS Fixer, see:

**[PHPStan and PHP CS Fixer guide](https://latablerouge.ninja/wordpress-phpstan-and-php-cs-fixer-guide/)**

Example configuration for pre-commit hooks:

```yaml
- repo: local
  hooks:
    - id: php-cs-fixer
      name: Check PHP with PHP CS Fixer
      entry: jakzal/phpqa:php8.3-debian php-cs-fixer fix -v --config=.php-cs-fixer.dist.php --using-cache=no --allow-risky=yes --diff
      language: docker_image
      types: [php]
    - id: phpstan
      name: Check PHP with PHPStan
      entry: jakzal/phpqa:php8.3-debian phpstan analyse --no-progress --no-interaction
      language: docker_image
      types: [php]
```

## How to Add Pre-commit to Your Project

### Step 1: Add the Configuration File

Create a `.pre-commit-config.yaml` file in the root of your project with the following content:

```yaml
repos:
- repo: https://github.com/pre-commit/pre-commit-hooks
  rev: v5.0.0
  hooks:
    - id: check-yaml
    - id: end-of-file-fixer
    - id: trailing-whitespace
    - id: mixed-line-ending
    - id: check-added-large-files
...
```

### Step 2: Add the Pre-commit Bash Script

Add the following bash script to enable pre-commit with Docker:
(`pre-commit`)
```bash
cd $(git rev-parse --show-toplevel)

docker pull -q devops/pre-commit:latest > /dev/null

docker run --privileged -t \
    -v $(pwd):$(pwd) \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -w $(pwd) \
    devops/pre-commit:latest \
    sh -c "git config --global --add safe.directory $(pwd) && pre-commit \"\$@\"" -- "$@"
```

### Step 3: Set Up the Pre-commit Hook in Git

Copy the bash script into your Git pre-commit hooks:

```bash
cp ./pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
```

### Step 4: Update Your README or composer.json

If you are using a PHP project, you can add the following to your `composer.json` file:

```json
"scripts": {
    "post-install-cmd": [
        "php -r \"copy('pre-commit', '.git/hooks/pre-commit');chmod('.git/hooks/pre-commit', 0755);\""
    ],
}
```

Alternatively, you can add the following to your `README.md` file:

```markdown
To enable pre-commit hooks, run the following command:
`cp ./pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`
```

### Step 5: Log into Docker

You need to be logged into Docker to corretly pull the image.

[How to log into Docker](../../infrastructure/hosting/internally-web-hosting/Kubernetes/Deployments/deployments-premium.md#1-getting-started)

## Additional Tips

- **Test Your Hooks**: After setup, test the pre-commit hooks with:
  ```bash
  ./pre-commit run -a
  ```
- **Add Custom Hooks**: Use the `.pre-commit-config.yaml` file to define custom hooks for specific needs.

For more details, refer to the [official Pre-commit documentation](https://pre-commit.com/).