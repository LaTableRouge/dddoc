# Useful Git Commands

🐙 **Git** is the most widely used version control system. It helps track changes in your code, collaborate with others, and manage your project's history.

Here's a cheat sheet of essential Git commands for everyday use.

---

## 🌱 **Basic Git Commands**

| Command                 | Description                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `git init`              | 🌱 Initialize a new Git repository in your project.                          |
| `git clone <repo-url>`  | 📥 Clone a remote repository to your local machine.                          |
| `git status`            | 🔍 Show the current status of your working directory and staging area.       |
| `git add <file>`        | ➕ Stage changes for the next commit (can also use `.` to add all files).    |
| `git commit -m "message"` | 💾 Save your changes to the repository with a commit message.             |
| `git push`              | 🚀 Upload your changes to the remote repository.                             |
| `git pull`              | 📥 Fetch and merge changes from the remote repository.                       |
| `git log`               | 📜 View the commit history of the current branch.                            |

---

## 🌳 **Branch Management**

| Command | Description |
| --- | --- |
| `git branch` | 📂 List all branches in the repository. |
| `git branch <branch-name>` | 🌿 Create a new branch. |
| `git checkout <branch-name>` | 🔄 Switch to another branch. |
| `git checkout -b <branch-name>` | 🌱 Create and switch to a new branch in one step. |
| `git merge <branch-name>` | 🤝 Merge the specified branch into the current branch. |
| `git branch -d <branch-name>` | ✂️ Delete a branch (use `-D` to force delete if it’s not fully merged). |
| `git rebase <branch-name>` | 📝 Reapply commits on top of another base branch. |

---

## 🔄 **Undoing Changes**

| Command               | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| `git reset <file>`    | 🛠️ Unstage a file without losing changes (move it from the staging area).   |
| `git checkout -- <file>` | ⏪ Discard changes to a file in the working directory.                   |
| `git reset --hard`    | 💣 Reset your working directory and staging area to the last commit (all changes lost).  |
| `git revert <commit-hash>` | ↩️ Create a new commit that undoes the changes in a previous commit.   |

---

## 🛠️ **Stashing**

| Command       | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| `git stash`   | 📦 Save your uncommitted changes without committing them, to come back to later.  |
| `git stash pop` | 🎁 Apply the last stashed changes and remove them from the stash list.     |
| `git stash list` | 📜 List all stored stashes.                                                |
| `git stash drop` | 🗑️ Remove a specific stash from the stash list.                          |

---

## 🔗 **Remote Repositories**

| Command | Description |
| --- | --- |
| `git remote -v` | 🌍 List all remotes and their URLs. |
| `git remote add <name> <url>` | 🔗 Add a remote repository by name. |
| `git fetch` | 📥 Fetch changes from the remote (without merging). |
| `git push <remote> <branch>` | 🚀 Push your branch to a remote repository. |
| `git pull <remote> <branch>` | 📥 Fetch and merge changes from the remote branch. |

---

## 🎯 **Pro Tips!**

- **`git diff`**: 🔍 View changes between commits, branches, or working directory vs. staging area.
- **`git cherry-pick <commit-hash>`**: 🍒 Apply the changes from a specific commit onto your current branch.
- **`git reflog`**: 🔍 Show a log of all changes to the tip of branches (good for recovering lost commits).

---

With these commands, you’ll master Git and be able to manage your project’s history like a pro! Make sure to bookmark this page for future reference.

Happy committing! 🐙