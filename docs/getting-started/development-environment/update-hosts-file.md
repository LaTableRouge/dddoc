# Updating the `hosts` File

This guide explains how to add custom entries to the `hosts` file on macOS, Linux (Debian-based), and Windows.

## macOS

1. **Open Terminal**: You can find it in `Applications > Utilities` or by searching for it using Spotlight (`Cmd + Space`).
2. **Edit the hosts file**:
   ```bash
   sudo nano /etc/hosts
   ```
3. **Add the Entries**: Scroll to the bottom of the file and add the lines mentioned above.
4. **Save and Exit**: Press `Ctrl + O` to save, then `Ctrl + X` to exit Nano.
5. **Flush DNS Cache** (optional): 
   ```bash
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   ```

## Linux (Debian-based)

1. **Open Terminal**.
2. **Edit the hosts file**:
   ```bash
   sudo vim /etc/hosts
   ```
3. **Add the Entries**: Move to the bottom of the file and add the lines mentioned above.
4. **Save and Exit**: In Vim, press `Esc`, type `:wq`, and press `Enter`.
5. **Flush DNS Cache** (optional):
   ```bash
   sudo systemctl restart nscd
   ```

## Windows

1. **Open Notepad as Administrator**:
   - Search for `Notepad` in the Start Menu.
   - Right-click on Notepad and select `Run as administrator`.
2. **Open the hosts file**:
   - In Notepad, go to `File > Open`.
   - Navigate to `C:\Windows\System32\drivers\etc\hosts`.
   - Make sure to select "All Files (\*.\*)" in the file type dropdown to see the `hosts` file.
3. **Add the Entries**: Scroll to the bottom of the file and add the lines mentioned above.
4. **Save the File**: Press `Ctrl + S` or go to `File > Save`.
5. **Flush DNS Cache** (optional):
   - Open Command Prompt as Administrator.
   - Run the following command:
     ```cmd
     ipconfig /flushdns
     ```