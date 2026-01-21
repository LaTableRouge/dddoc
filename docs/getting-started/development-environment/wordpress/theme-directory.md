---
sidebar_label: 'Mapping Theme Directory'
sidebar_position: 1
---

# Mapping WordPress Theme Directory to an External Folder Using Docker Compose

## **Overview**

This documentation explains how to map the WordPress Bedrock theme directory to an external folder on your host machine using Docker Compose.

The objective is to manage themes centrally outside of the Docker container, allowing easy modifications and reusability across multiple WordPress projects.

## **Project Structure**

We assume the following project directory structure:

```plaintext
Projects/
├── Plugins/
├── Themes/
├── Tools/
│   ├── documentation/
│   └── dockerized/
└── Websites/
    ├── project-1/
    └── project-2/
```

In this structure:
- `Themes/` is where all WordPress themes are stored on the host.
- `Websites/project-1/` contains the specific WordPress project with Docker Compose setup.

## **Step-by-Step Guide**

### **1. Locate Theme Directory**
In a typical WordPress (Bedrock) setup, the theme directory is located in:
```text
web/app/themes
```

### **2. Update `docker-compose.yml`**

To ensure the Bedrock installation points to an external folder for the themes, you need to modify the `docker-compose.yml` file in `Websites/project-1/`.

Below is an example `docker-compose.override.yml` configuration:

```yaml
services:
  app_worpress:
    build:
      args:
        - WORDPRESS_ENV=${APP_ENV}
    volumes:
      - ./:/var/www/project/:cached
      - /var/www/project/vendor
      # we add this line to link Themes folder to project :
      - ../../Themes:/var/www/project/web/app/themes
    labels:
      - traefik.http.routers.${PROJECT_NAME}.rule=Host(`${APP_FQDN}`)
      - traefik.http.routers.${PROJECT_NAME}.entrypoints=http
      - traefik.http.services.${PROJECT_NAME}.loadbalancer.server.port=80
    environment:
      - WORDPRESS_ENV=${APP_ENV}
    networks:
      - traefik
      - wordpress

  node:
    build:
      context: ./docker
      dockerfile: Dockerfile-node
    command: bash -c "yarn && tail -f /dev/null"
    volumes:
      - ./:/var/www/project
    networks:
      - wordpress

networks:
  wordpress:
  traefik:
    external: true
```

#### **3. Key Configuration Details**
- **Volume Mapping for Themes:**
   ```yaml
   - ../../Themes:/var/www/html/web/app/themes
   ```
   - `../../Themes` is the path on your host machine, relative to the location of `docker-compose.yml`.
   - `/var/www/html/web/app/themes` is the path inside the Docker container where wordpress expects themes to be stored (In this exemple, Bedrock project).

##### **4. Restart Docker Services**

Once the `docker-compose.yml` is updated, restart the services to apply the changes:

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

## **5. Verify Theme Directory Mapping**
After the Docker containers are up and running, you can verify if the WordPress installation is using the external `Themes` directory by logging into WordPress.

Check if the themes are accessible.

Any themes placed in `/path/to/Projects/Themes` should now appear in WordPress.

## **Additional Considerations**
- If you're working on multiple WordPress projects, this setup allows you to manage and share themes across projects by placing them in the external `Themes` directory.

---

## **Conclusion**

By following this guide, you will successfully configure Docker Compose to use an external folder for WordPress themes in a Bedrock setup.

This approach improves the flexibility and maintainability of your WordPress projects by allowing easy theme management outside the Docker container.