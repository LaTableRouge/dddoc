---
sidebar_label: 'Base setup'
sidebar_position: 1
---

# Setup your development environment

Welcome to the setup guide for your development environment! To simplify dependency management and configurations, we use Docker for the entire development environment.

This means that the only tools you need to install locally are **Git** and **Docker Desktop**.

:::danger
If you are working on a Windows computer, you need to install a Linux VM on your machine.

You can follow this tutorial which guides you through the installation of the VM [(Install a Linux VM with VirtualBox on Windows)](./install-linux-vm-on-windows.md).
:::

## Installation on Mac

### Docker Desktop

1. **Download**:
   - Visit the official Docker website: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/).
   - Download the `.dmg` installer.

2. **Install**:
   - Open the downloaded `.dmg` file.
   - Drag the Docker icon to the Applications folder.

3. **Launch**:
   - Go to the Applications folder and double-click Docker.
   - Follow the on-screen instructions to complete the initial setup.

4. **Install Xcode Command Line Tools** (if not already installed):
   - Open Terminal and run the following command to install the Xcode Command Line Tools, which Docker requires:
     ```bash
     xcode-select --install
     ```
   - If prompted, agree to the license terms.

5. **Verify**:
   - Open Terminal and type `docker --version` to check that Docker is installed correctly.

### Git (Mac)

1. **Verify**:
   - Open Terminal and type `git --version` to ensure Git is installed correctly.

2. **Install**:
   - **If Git is not installed**, you can install it using Homebrew (a package manager for macOS). If Homebrew is not installed, first install it by running:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Then, install Git by running:
     ```bash
     brew install git
     ```

## Installation on Linux

### Docker Engine

1. **Install Docker Engine**:
   - Follow the instructions for your specific Linux distribution on the Docker documentation page: [Get Docker Engine](https://docs.docker.com/engine/install/).

2. **Verify**:
   - Open a terminal and run `docker --version` to ensure Docker Engine is installed correctly.

### Git (Linux)

1. **Install Git**:
   - For Debian-based distributions (like Ubuntu), run:
     ```bash
     sudo apt update
     sudo apt install git
     ```
   - For Red Hat-based distributions (like CentOS), run:
     ```bash
     sudo yum install git
     ```
   - For other distributions, use the appropriate package manager or visit [Git’s installation documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for detailed instructions.

2. **Verify**:
   - Open a terminal and run `git --version` to check that Git is installed correctly.