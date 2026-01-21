---
sidebar_position: 1
---

# WordPress Docker Setup with Apache/PHP

This guide explains how to set up and run a WordPress project using Docker with Apache and PHP.

:::warning
This required to have docker installed on your computer [(Setup your development environment)](../installation.md) and Dockerized running [(Setup Docker with Traefik, MariaDb, Redis ...)](../traefik-dockerized.md)
:::

## Step 1: Download your WordPress project

Download your WordPress project and place it in the `Websites` directory ([See folder hierarchy](../../folder-hierarchy.md)).

## Step 2: Create Necessary Files and Folders

Within your WordPress project, create the following directories and files:

```text
your-wordpress-project/
│
├── conf/
│   ├── apache.conf
│   ├── php.ini
│   └── vhost.conf
│
├── docker-compose.yml
├── Dockerfile
├── .env (if not already exist)
├── ... (other WordPress files)
```

## Step 3: Configure Apache

Edit the `apache.conf` file and add the following content:

```apache
# conf/apache.conf
<Directory /app/>
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted

    SetEnvIf X_FORWARDED_PROTO https HTTPS=on
</Directory>

ServerTokens Prod
ServerSignature Off
```

## Step 4: Configure PHP

Edit the `php.ini` file with the following configuration:

```ini
; conf/php.ini
date.timezone = Europe/Paris

opcache.enable = 1
opcache.enable_cli = 1
opcache.memory_consumption = 128
opcache.revalidate_freq = 0
apc.enable_cli = On

upload_max_filesize = 16M
post_max_size = 16M

realpath_cache_size=4096k
realpath_cache_ttl=7200

display_errors = on
display_startup_errors = on
```

## Step 5: Configure Apache Virtual Host

Edit the `vhost.conf` file with the following content:

```apache
# conf/vhost.conf
<VirtualHost *:80>
    ServerAdmin your-email@example.com

    DocumentRoot /app
    DirectoryIndex index.php index.html index.htm

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Step 6: Create the Dockerfile

Edit the `Dockerfile` with the following content:

```dockerfile
# Dockerfile
FROM php:8.3-apache

ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /app

# Install necessary packages
RUN apt-get update -qq && \
    apt-get install -qy \
    git \
    gnupg \
    unzip \
    zip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) opcache pdo_mysql mysqli
COPY conf/php.ini /usr/local/etc/php/conf.d/app.ini

# Configure Apache
COPY conf/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY conf/apache.conf /etc/apache2/conf-available/z-app.conf
COPY index.php /app/index.php

RUN a2enmod rewrite remoteip && \
    a2enconf z-app
```

## Step 7: Create `docker-compose.yml`

Edit the `docker-compose.yml` file with the following configuration:

```yaml
version: '3.8'

services:
  docker_app:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - .:/app
      - ./conf/php.ini:/usr/local/etc/php/conf.d/app.ini
      - ./errors:/errors
      - ./conf/vhost.conf:/etc/apache2/sites-available/000-default.conf
      - ./conf/apache.conf:/etc/apache2/conf-available/z-app.conf
      - ./index.php:/app/index.php
    labels:
      - "traefik.http.routers.${PROJECT_NAME}.rule=Host(`${APP_FQDN}`)"
      - traefik.http.routers.${PROJECT_NAME}.entrypoints=http
      - traefik.http.services.${PROJECT_NAME}.loadbalancer.server.port=80
    environment:
      - COMPOSER_ALLOW_SUPERUSER=1
    networks:
      - traefik
      - app-network

networks:
  app-network:
    driver: bridge
  traefik:
    external: true
```

## Step 8: Edit `wp-config.php`

Finally, open the `wp-config.php` file and configure the database connection:

```php
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'dockerdb' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'dockerize_mariadb:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
```

## Step 9: Edit `.env`

Add the following two lines to the `.env` file:

```env
PROJECT_NAME=project_name  # Replace with your project name
APP_FQDN=your-project-name.local   # Replace with your domain or hostname
```

## Step 10: Update your Hosts File

You need to update your `hosts` file to map local domains to `127.0.0.1`.

### macOS
Edit the hosts file using the following command:

```bash
nano /etc/hosts
```

### Linux (Debian-based)
Edit the hosts file using the following command:

```bash
vim /etc/hosts
```

### Add the following lines:
```bash
127.0.0.1 your-project-name.local
```

---
With these configurations, your WordPress project should be ready to run on Docker with Apache and PHP.

## Run your project in docker

```sh
$ docker-compose build
$ docker-compose up -d
```

You can now go to your-project-name.local and enjoy
