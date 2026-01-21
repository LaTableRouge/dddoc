---
sidebar_position: 1
---

# Useful Docker & Docker Compose Commands

🚢 **Docker** and **Docker Compose** are essential tools for creating, deploying, and managing containerized applications.

Below is a handy cheat sheet of the most useful commands to streamline your workflow. Whether you're a beginner or experienced developer, these commands are crucial!

:::tip
**New to Docker?** Check out the [Docker and Docker Compose training guide](../../training/docker-and-docker-composer.md) for a comprehensive introduction to Docker concepts and hands-on exercises.
:::

---

## 🔀 **Docker Compose Commands**

| Command                                   | Description                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| `docker-compose up`                       | 🛫 Start containers defined in `docker-compose.yml`.                         |
| `docker-compose up -d`                    | 🚀 Start containers in detached mode (background).                           |
| `docker-compose down`                     | ⛔ Stop and remove containers, networks, and volumes.                        |
| `docker-compose build`                    | 🏗️ Build images for all services in `docker-compose.yml`.                   |
| `docker-compose ps`                       | 📋 List all running containers in the current project.                       |
| `docker-compose exec <service-name> bash` | 🖥️ Start an interactive terminal session inside a service container.        |
| `docker-compose logs`                     | 📝 View logs from all services.                                              |
| `docker-compose stop`                     | 🛑 Stop running containers without removing them.                            |
| `docker-compose restart`                  | 🔄 Restart stopped containers.                                               |
| `docker-compose rm <service-name>`        | 🧹 Remove a service container.                                               |
| `docker-compose pull`                     | 🔄 Pull updated images for all services.                                     |

---

### 🎯 **Pro Tip!**

- **`docker system prune`**: 🧹 Remove all unused containers, images, and volumes.
- **`docker-compose up --build`**: 🔄 Rebuild images and restart services.

---

## 🐳 **Docker Commands**

| Command                                             | Description                                                                 |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| `docker pull <image>`                               | 🛠️ Download an image from Docker Hub.                                       |
| `docker build -t <image-name> .`                    | 🏗️ Build a Docker image from a Dockerfile.                                  |
| `docker images`                                     | 🖼️ List all locally stored images.                                          |
| `docker run -d -p <port>:<port> <image>`           | 🚀 Run a container in detached mode (background).                      |
| `docker ps`                                         | 🔍 List all running containers.                                             |
| `docker ps -a`                                      | 🗂️ List all containers (including stopped ones).                            |
| `docker exec -it <container-name> bash`             | 🔧 Start an interactive terminal session inside a running container.       |
| `docker stop <container-name>`                      | ✋ Stop a running container.                                                 |
| `docker rm <container-name>`                        | 🧹 Remove a stopped container.                                                |
| `docker rmi <image-name>`                           | 🚮 Remove a Docker image.                                                     |
| `docker logs <container-name>`                      | 📜 View logs from a running container.                                        |
| `docker volume ls`                                  | 💾 List all Docker volumes.                                                   |
| `docker network ls`                                 | 🌐 List all Docker networks.                                                  |
| `docker inspect <container-name>`                   | 🧐 Get detailed information about a container.                                |

---

With these commands at your fingertips, you'll be managing Docker containers like a pro! Keep this cheat sheet handy as a quick reference.

Happy containerizing! 🐳