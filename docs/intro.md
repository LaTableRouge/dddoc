# Welcome !

This documentation is crucial for the proper functioning and evolution of the project. It belongs to the technical team, and keeping it up to date is essential.

Every team member is encouraged to actively contribute to ensure its relevance and clarity.

## Procedure for submitting a change or update this documentation

### Steps to follow:

1. **Clone the project:**
   - First, clone the repository to your local machine in the `Tools` directory ([See folder hierarchy](./getting-started/development-environment/folder-hierarchy.md)) using the GitHub repository URL.
   - Use the following command:
     ```bash
     git clone git@github.com:LaTableRouge/doc.git
     cd doc
     ```

2. **Create a branch:**
   - Create a new branch with a descriptive name for your changes, e.g., `feature/update-doc`.
   - Use the following command:
     ```bash
     git checkout -b feature/update-doc
     ```

3. **Commit your changes:**
   - After making your changes, commit them to the branch you created.
   - Stage your changes and commit them with a meaningful message:
     ```bash
     git add .
     git commit -m "Updated the documentation for [feature or update description]"
     ```

4. **Submit a pull request:**
   - Push your branch to the remote repository:
     ```bash
     git push origin feature/update-doc
     ```
   - Go to the GitHub repository and submit a pull request to the `main` branch (or `master` if that's the default branch).

5. **Wait for approval:**
   - Wait for a review and approval of your changes. Once approved, your changes will be merged.