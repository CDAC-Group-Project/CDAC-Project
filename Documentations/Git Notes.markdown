# Introduction to Git and Code Versioning

## Overview of Code Versioning Systems
A code versioning system (VCS) is a tool that tracks changes to source code over time, enabling multiple developers to collaborate efficiently. It maintains a history of modifications, facilitates teamwork, and ensures code integrity. Git, a distributed VCS, is widely used for its speed, flexibility, and robust branching model.

### Software Development Workflow
The typical workflow in software development with Git involves:
1. **Initialization**: Setting up a repository to track code.
2. **Staging and Committing**: Adding changes to a staging area and creating snapshots (commits).
3. **Branching**: Creating separate lines of development for features or fixes.
4. **Merging**: Integrating changes from different branches.
5. **Collaboration**: Sharing code with team members via remote repositories.

## Introduction to Git
Git is a distributed version control system that allows multiple developers to work on the same codebase simultaneously. Each developer has a local copy of the repository, including its full history, enabling offline work and efficient collaboration.

### Git Repository and Structure
A Git repository is a storage system that tracks all changes to files. It consists of:
- **Working Directory**: The local folder containing project files.
- **Staging Area**: A temporary area where changes are prepared for committing.
- **Repository (.git directory)**: Stores the commit history and metadata.
- **HEAD**: A pointer to the current branch or commit.

## Basic Git Workflow
The following commands outline the fundamental Git operations for managing code.

### Initializing a Repository
To start tracking a project with Git:
```bash
git init
```
This creates a `.git` directory in the project folder, initializing an empty repository.

### Checking Status
To view the status of files in the working directory:
```bash
git status
```
For a concise status:
```bash
git status -s
```
The short status uses two characters:
- First character: Staging area status (e.g., `A` for added, `M` for modified in staging).
- Second character: Working directory status (e.g., `M` for modified, `??` for untracked).

### Adding Files to Staging
To stage specific files or all changes:
```bash
git add <file_name>
git add .
```

### Committing Changes
To create a snapshot of staged changes:
```bash
git commit -m "Descriptive commit message"
```

### Viewing Commit History
To list all commits:
```bash
git log
```
For a compact, graphical view:
```bash
git log --oneline --graph --color
```

### Comparing Changes
To view differences between the working directory and the last commit:
```bash
git diff
```

### Restoring Files
To revert a file to its last committed version:
```bash
git checkout <file_name>
```

### Resetting Changes
- **Soft Reset**: Moves staged changes back to the working directory without losing them.
  ```bash
  git reset
  ```
- **Hard Reset**: Discards all changes in the staging area and working directory, reverting to the last commit.
  ```bash
  git reset --hard
  ```

### Removing Repository Metadata
To delete the entire Git history (use with caution):
```bash
rm -rf .git
```

## Branching in Git
Branches are references to specific commits, allowing parallel development. The default branch is often named `main`.

### Listing Branches
To view all branches (the current branch is marked with `*`):
```bash
git branch
```
Alternatively, check the current branch with:
```bash
git status
```

### Creating and Switching Branches
To create a new branch (without switching):
```bash
git branch <branch_name>
```
To switch to an existing branch:
```bash
git checkout <branch_name>
```
To create and switch to a new branch in one step:
```bash
git checkout -b <branch_name>
```

### Merging Branches
To merge changes from one branch into another:
1. Switch to the target branch (e.g., `main`):
   ```bash
   git checkout main
   ```
2. Merge the source branch (e.g., `feature-branch`):
   ```bash
   git merge feature-branch
   ```

### Handling Merge Conflicts
Conflicts occur when the same lines in a file are modified in both branches. Git marks conflicts with markers (`>>>>>>>` and `<<<<<<<`). To resolve:
1. Open the conflicted file(s).
2. Manually edit to keep desired changes and remove conflict markers.
3. Stage the resolved file(s):
   ```bash
   git add <file_name>
   ```
4. Commit the resolution:
   ```bash
   git commit
   ```

### Deleting a Branch
To delete a branch (cannot delete the current branch):
```bash
git branch -d <branch_name>
```

## Shared Repositories
Repositories can be local (on your machine) or remote (on servers like GitHub, GitLab, or BitBucket).

### Connecting to a Remote Repository
To view remote repository details:
```bash
git remote -v
```
To add a remote repository:
```bash
git remote add origin <repository_url>
```

### Pushing Changes
To send local commits to the remote repository:
```bash
git push origin <branch_name>
```

### Pulling Changes
To fetch and merge changes from the remote repository:
```bash
git pull origin <branch_name>
```

### Removing a Remote
To disconnect a remote repository:
```bash
git remote remove origin
```

## Sample Example: Developing a Simple Application
Below is an example of using Git to manage a team project, creating a simple text file and collaborating via branches.

### Scenario
A team is developing a project with a file `readme.txt`. One developer adds content, while another works on a feature branch to enhance it.

1. **Initialize the Repository**:
   ```bash
   git init
   ```

2. **Create and Stage a File**:
   Create `readme.txt` with initial content:
   ```
   Project Overview
   This is a sample project for learning Git.
   ```
   Stage and commit:
   ```bash
   git add readme.txt
   git commit -m "Initial commit with readme"
   ```

3. **Create a Feature Branch**:
   Developer 1 creates a branch for adding more details:
   ```bash
   git checkout -b add-details
   ```
   Edit `readme.txt` to:
   ```
   Project Overview
   This is a sample project for learning Git.
   Features:
   - Version control with Git
   - Collaborative development
   ```
   Stage and commit:
   ```bash
   git add readme.txt
   git commit -m "Added feature list to readme"
   ```

4. **Merge the Branch**:
   Switch to `main` and merge:
   ```bash
   git checkout main
   git merge add-details
   ```

5. **Handle a Conflict**:
   Developer 2 creates another branch `update-overview` and modifies `readme.txt`:
   ```bash
   git checkout -b update-overview
   ```
   Edit `readme.txt`:
   ```
   Project Overview
   This is a sample project for mastering Git.
   ```
   Commit changes:
   ```bash
   git add readme.txt
   git commit -m "Updated overview description"
   ```
   Switch to `main` and merge, causing a conflict:
   ```bash
   git checkout main
   git merge update-overview
   ```
   Git reports a conflict in `readme.txt`. The file now contains:
   ```
   Project Overview
   <<<<<<< HEAD
   This is a sample project for learning Git.
   Features:
   - Version control with Git
   - Collaborative development
   =======
   This is a sample project for mastering Git.
   >>>>>>> update-overview
   ```
   Resolve by editing `readme.txt` to:
   ```
   Project Overview
   This is a sample project for mastering Git.
   Features:
   - Version control with Git
   - Collaborative development
   ```
   Stage and commit the resolution:
   ```bash
   git add readme.txt
   git commit
   ```

6. **Push to Remote Repository**:
   Add a remote repository (e.g., GitHub):
   ```bash
   git remote add origin <repository_url>
   ```
   Push changes:
   ```bash
   git push origin main
   ```

7. **Collaborate**:
   Another developer pulls the latest changes:
   ```bash
   git pull origin main
   ```

This example demonstrates initializing a repository, branching, merging, resolving conflicts, and collaborating via a remote repository.