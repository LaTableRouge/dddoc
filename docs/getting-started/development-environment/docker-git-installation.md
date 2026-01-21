# Docker Desktop and Git Installation Guide

## Table of Contents

- [Installation on Mac](#installation-on-mac)
  - [Docker Desktop (Mac)](#docker-desktop-mac)
  - [Git (Mac)](#git-mac)
- [Installation on Windows](#installation-on-windows)
  - [Docker Desktop (Windows)](#docker-desktop-windows)
  - [Git (Windows)](#git-windows)
- [Installation on Linux](#installation-on-linux)
  - [Docker Engine](#docker-engine)
  - [Git (Linux)](#git-linux)

## Installation on Mac

### Docker Desktop (Mac)

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

1. **Download and Install**:
   - Install Git using Homebrew (a package manager for macOS). If Homebrew is not installed, first install it by running:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Then, install Git by running:
     ```bash
     brew install git
     ```

2. **Verify**:
   - Open Terminal and type `git --version` to ensure Git is installed correctly.

## Installation on Windows

### Docker Desktop (Windows)

1. **Download**:
   - Go to the Docker website: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
   - Download the `.exe` installer.

2. **Install**:
   - Run the downloaded `.exe` file.
   - Follow the installation wizard’s instructions to complete the installation.

3. **Launch**:
   - After installation, search for Docker Desktop in the Start menu and launch it.
   - Complete any additional setup steps as prompted.

4. **Verify**:
   - Open Command Prompt or PowerShell and type `docker --version` to ensure Docker is installed correctly.

### Git (Windows)

1. **Download**:
   - Visit the official Git website: [Git for Windows](https://git-scm.com/download/win).
   - Download and run the installer.

2. **Install**:
   - Follow the installation wizard’s instructions, selecting the default options or customizing as needed.

3. **Verify**:
   - Open Command Prompt or PowerShell and type `git --version` to check that Git is installed correctly.

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