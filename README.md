# Documentation

This repository contains personal documentation for development tools, tips, and reference materials.

## 📚 Documentation Structure

### [Getting Started](./docs/getting-started/)
Documentation to help you get started with the development environment and tools.

### [Development](./docs/development/)
Development tips, best practices, tools, and guidelines.

### [Reference](./docs/reference/)
Quick reference guides, cheat sheets, and code snippets.

### [WordPress](./docs/Wordpress/)
WordPress development, themes, plugins, and optimization documentation.

### [Templates](./docs/templates/)
Project templates and boilerplates for quick project setup.

## 🚀 Quick Start

1. Browse the documentation directly on GitHub - all markdown files are rendered automatically
2. Clone the repository to access files locally:
   ```bash
   git clone git@github.com:LaTableRouge/doc.git
   cd doc
   ```

## 📝 Contributing

See the [contribution guide](./docs/intro.md) for details on how to update this documentation.

## 🛠️ Development

### Docker Container in this project

This repository includes a Docker setup to manage npm dependencies without requiring Node.js to be installed locally.

#### How it works

The Docker container uses:
- **Dockerfile**: Simple Node.js LTS image that installs dependencies
- **docker-compose.yml**: Service configuration that:
  - Mounts the project directory to `/app` in the container
  - Creates a volume for `node_modules` to persist dependencies
  - Runs `npm install` and keeps the container running

#### Usage

**Start the container (installs dependencies and keeps running):**
```bash
docker-compose up -d
```

**Run npm commands:**
```bash
# Using exec (container must be running)
docker-compose exec app npm run <script-name>
```

**Stop the container:**
```bash
docker-compose down
```

**Alternative (if you have Node.js installed locally):**
```bash
npm install
```

### Linting

Lint markdown files:
```bash
npm run lint:md
```

Or with Docker:
```bash
docker-compose exec app npm run lint:md
```

### Git Hooks

This repository uses Husky for git hooks:
- Pre-commit: Runs linting and formatting checks
- Commit-msg: Validates commit message format
- Pre-push: Validates branch naming conventions

## 📖 Documentation Format

All documentation is written in Markdown format and can be viewed directly on GitHub. The documentation is organized by topic in the `docs/` directory.
