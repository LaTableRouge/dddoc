---
id: install-linux-vm-on-windows
title: Install a Linux VM with VirtualBox on Windows
description: Step-by-step guide to install a Linux virtual machine on Windows using VirtualBox.
---

## 1. Install VirtualBox on Windows

### Prerequisites:
- A Windows PC with at least 4 GB of RAM (8 GB recommended).
- An internet connection to download the necessary software.

### Steps:

1. **Download VirtualBox:**
   - Visit the official [VirtualBox website](https://www.virtualbox.org/) and download the version compatible with Windows.
   - Download the Extension Pack available on the same page to add extra features like USB 2.0/3.0 support.

2. **Install VirtualBox:**
   - Run the downloaded installer and follow the instructions, leaving the default options unless needed.
   - After installation, install the Extension Pack by double-clicking it or by going to _File_ → _Preferences_ → _Extensions_ and clicking the add icon.

## 2. Download a Linux ISO Image

To create a virtual machine, you need a Linux disk image (.iso). Here are some popular distributions:

- [Ubuntu](https://ubuntu.com/download/desktop)

Download the ISO file of the Linux distribution you prefer.

## 3. Create a Virtual Machine in VirtualBox

1. **Open VirtualBox:**
   - Launch VirtualBox after installation.

2. **Create a New VM:**
   - Click **New** or press `Ctrl + N` to create a new virtual machine.
   - Give it a name (e.g., "Ubuntu"), select "Linux" as the type, and choose the version that matches your downloaded ISO (e.g., Ubuntu 64-bit).

3. **Set RAM Allocation:**
   - Allocate RAM for your VM. For Ubuntu, 2 GB (2048 MB) is enough, but 4 GB is recommended if you have extra memory available.

4. **Create a Virtual Hard Disk:**
   - Choose **Create a virtual hard disk now**.
   - Select the `VDI` (VirtualBox Disk Image) format.
   - Choose **Dynamically allocated** so the disk grows as needed.
   - Set the size of the virtual disk (at least 20 GB recommended).

## 4. Install Linux on the VM

1. **Start the VM:**
   - Select your newly created VM in VirtualBox and click **Start**.
   - When prompted, choose the Linux ISO file you downloaded by clicking the folder icon to browse for it.

2. **Install Linux:**
   - Follow the on-screen instructions to install Linux in the VM. These steps vary depending on the distribution you chose.
   - Configure settings like language, time zone, username, and password during the installation.

3. **Remove the ISO:**
   - After installation, reboot the VM. Make sure it boots from the virtual hard disk by removing the ISO file.
   - Go to the _Devices_ menu → _Optical Drives_ and uncheck the ISO file.

## 5. Additional Configuration

- **Screen Resolution:**
  To adjust the screen resolution, install VirtualBox’s "Guest Additions". This enhances display management and allows you to resize the VM window. Go to _Devices_ → _Insert Guest Additions CD image..._.

- **Network:**
  By default, VirtualBox uses NAT mode for networking, which allows the VM to access the internet via the host.

If you need the VM to have a dedicated IP on your local network, you can switch to **Bridged Adapter** mode in the network settings.

## 6. Using the VM

- **Start/Stop the VM:**
  Start your VM by selecting it and clicking **Start**.
  To stop it, shut down Linux inside the VM or close the VirtualBox window and choose **Power off the machine**.

## Conclusion

You now have a fully functional Linux virtual machine running on your Windows computer using VirtualBox! You can explore Linux, test software, or develop projects in this isolated virtual environment.
