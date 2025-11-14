Conversion of user stories into GitHub Issues

What this folder contains

- `issues/` - a markdown file per user story. Each file is a ready-to-create GitHub Issue (first line is the title).
- `create-issues.ps1` - PowerShell script that uses the GitHub CLI (`gh`) to create issues from the files in `issues/`.

How to use

1. Install and authenticate GitHub CLI (if not already):

```powershell
# Install instructions (Windows):
# 1) Download from https://github.com/cli/cli/releases or use winget: winget install --id GitHub.cli
# 2) Authenticate:
gh auth login
```

2. Preview the issues:

Open the files in `github-issues\issues` and edit titles, labels, assignees, or project names if you like.

3. Create the issues (run from this folder):

```powershell
# From the repository root
cd "c:\Users\User\OneDrive\Documents\Vs code projects\TypeRacer\github-issues"
# Run the script (it will create issues using `gh issue create` for each markdown file in the issues/ folder)
.\create-issues.ps1
```

4. Add issues to your GitHub Project Board

- Manual: open an issue in GitHub and use the "Projects" sidebar to add it to a project and column.
- Programmatic: You can use the GitHub REST API or Projects API to add created issues to a specific project/column. If you'd like, I can produce a script for that (needs a project id and a personal access token with proper scopes).

Notes

- The script will tag each created issue with a default label `user-story`. You can adjust labels inside the markdown files or modify the script.
- If you want issues to be automatically placed in a specific project column, tell me the project type (classic or beta) and the project/column identifiers and I will add a script to attach them automatically.
