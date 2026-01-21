---
sidebar_label: 'Folder Hierarchy'
sidebar_position: 7
---

# Development Environment Folder Hierarchy

This document outlines the recommended folder structure for organizing your development projects, tools, and documentation.

## Recommended Structure

```plaintext
Projects/
├── Plugins/
│   └── [WordPress plugins]
├── Themes/
│   └── [WordPress themes]
├── Tools/
│   ├── documentation/
│   └── dockerized/
└── Websites/
    ├── project-1/
    ├── project-2/
    └── [other WordPress projects]
```

## Directory Descriptions

### `Projects/`
The root directory for all your development projects and tools.

### `Plugins/`
Store WordPress plugins that are shared across multiple projects or developed independently.

### `Themes/`
Store WordPress themes that are shared across multiple projects. This allows you to manage themes centrally outside of Docker containers, enabling easy modifications and reusability.

See [Mapping Theme Directory](./wordpress/theme-directory.md) for details on how to map this directory in Docker.

### `Tools/`
Contains development tools and utilities:
- **`documentation/`**: This documentation repository
- **`dockerized/`**: Docker development environment setup (see [Setup Dockerized](./traefik-dockerized.md))

### `Websites/`
Contains individual WordPress project directories. Each project should have its own subdirectory with:
- Docker configuration files (`docker-compose.yml`, `Dockerfile`)
- WordPress installation files
- Project-specific configuration

See [Run WordPress with Docker](./wordpress/run-wordpress-with-docker.md) for setup instructions.

## Benefits of This Structure

1. **Centralized Theme Management**: Themes stored in `Themes/` can be shared across multiple WordPress projects
2. **Plugin Reusability**: Plugins in `Plugins/` can be easily referenced by multiple projects
3. **Tool Organization**: Development tools and documentation are kept separate from project code
4. **Clear Separation**: Each project in `Websites/` is isolated while still having access to shared resources

## Example Usage

When setting up a new WordPress project:

1. Create a new directory in `Websites/`: `Projects/Websites/my-new-project/`
2. Clone or create your WordPress installation in that directory
3. Configure Docker to map the `Themes/` directory (see [Mapping Theme Directory](./wordpress/theme-directory.md))
4. Reference shared plugins from `Plugins/` if needed
