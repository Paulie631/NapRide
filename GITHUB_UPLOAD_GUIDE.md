# Upload NapRoute to GitHub - Complete Guide

## Overview
This guide will help you upload your NapRoute project to GitHub so you can share it, collaborate, or deploy it from anywhere.

## Prerequisites

### 1. Install Git (Required)

**Download and Install Git**:
1. Go to: https://git-scm.com/download/win
2. Download "64-bit Git for Windows Setup"
3. Run the installer
4. **Important settings during installation**:
   - Use "Git from the command line and also from 3rd-party software"
   - Use "Checkout Windows-style, commit Unix-style line endings"
   - Use "MinTTY" as terminal emulator
   - Enable "Git Credential Manager"
5. Click "Install"
6. **Restart your computer** after installation

**Verify Installation**:
```cmd
git --version
```

You should see something like: `git version 2.43.0.windows.1`

### 2. Create GitHub Account (If you don't have one)

1. Go to: https://github.com/
2. Click "Sign up"
3. Follow the registration process
4. Verify your email address

### 3. Configure Git (First Time Only)

Open Command Prompt and run:

```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email (use the same email as your GitHub account).

## Step-by-Step Upload Process

### Step 1: Create a New Repository on GitHub

1. Go to https://github.com/
2. Log in to your account
3. Click the "+" icon in the top right
4. Select "New repository"
5. Fill in the details:
   - **Repository name**: `naproute` (or any name you prefer)
   - **Description**: "Mobile app for planning driving routes that match nap times"
   - **Visibility**: Choose "Public" or "Private"
   - **DO NOT** check "Initialize this repository with a README"
   - **DO NOT** add .gitignore or license yet
6. Click "Create repository"

**Save the repository URL** - it will look like:
- HTTPS: `https://github.com/yourusername/naproute.git`
- SSH: `git@github.com:yourusername/naproute.git`

### Step 2: Prepare Your Project

#### Create .gitignore File

The project should already have a `.gitignore` file, but let's verify it's complete:

```cmd
cd Documents\NapRoute
type .gitignore
```

If it doesn't exist or is incomplete, create/update it with the content below.

#### Update README.md

Create a proper README for GitHub visitors:

```cmd
cd Documents\NapRoute
```

The README.md should already exist. If not, we'll create one.

### Step 3: Initialize Git Repository

Open Command Prompt and navigate to your project:

```cmd
cd Documents\NapRoute
```

Initialize Git:

```cmd
git init
```

You should see: `Initialized empty Git repository in C:/Users/paula/Documents/NapRoute/.git/`

### Step 4: Add Files to Git

Add all files to Git (this stages them for commit):

```cmd
git add .
```

This adds all files except those listed in `.gitignore`.

### Step 5: Create First Commit

Commit the files with a message:

```cmd
git commit -m "Initial commit: NapRoute mobile app with all features"
```

You should see a summary of files added.

### Step 6: Connect to GitHub

Add your GitHub repository as the remote origin:

```cmd
git remote add origin https://github.com/yourusername/naproute.git
```

**Replace `yourusername` with your actual GitHub username!**

Verify the remote was added:

```cmd
git remote -v
```

### Step 7: Push to GitHub

Push your code to GitHub:

```cmd
git push -u origin main
```

Or if your default branch is named "master":

```cmd
git push -u origin master
```

**Note**: You may be prompted to log in to GitHub. Use your GitHub username and password (or personal access token).

### Step 8: Verify Upload

1. Go to your GitHub repository URL
2. Refresh the page
3. You should see all your files uploaded!

## What Gets Uploaded

✅ **Included**:
- All source code (`src/` folder)
- Configuration files
- Documentation files
- Android native code
- iOS native code
- Package.json and dependencies list

❌ **Excluded** (via .gitignore):
- `node_modules/` (too large, can be reinstalled)
- Build artifacts
- IDE settings
- Environment files with secrets
- OS-specific files

## After Upload

### Clone on Another Computer

To download your project on another computer:

```cmd
git clone https://github.com/yourusername/naproute.git
cd naproute
npm install
```

### Update Your Repository

After making changes:

```cmd
# Check what changed
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

## Common Issues and Solutions

### Issue: "git is not recognized"

**Solution**: 
- Git is not installed or not in PATH
- Install Git from https://git-scm.com/download/win
- Restart your computer
- Restart Command Prompt

### Issue: "Permission denied (publickey)"

**Solution**: 
- Use HTTPS instead of SSH
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Issue: "Authentication failed"

**Solution**: 
- Use a Personal Access Token instead of password
- Go to GitHub → Settings → Developer settings → Personal access tokens
- Generate new token with "repo" scope
- Use token as password when prompted

### Issue: "Repository not found"

**Solution**: 
- Check the repository URL is correct
- Make sure you created the repository on GitHub
- Verify you're logged in to the correct GitHub account

### Issue: "Large files warning"

**Solution**: 
- Make sure `node_modules/` is in `.gitignore`
- Don't commit build artifacts
- Use Git LFS for large binary files if needed

### Issue: "Failed to push some refs"

**Solution**: 
```cmd
# Pull latest changes first
git pull origin main --rebase

# Then push
git push origin main
```

## Creating a Good README for GitHub

Your repository should have a README.md that includes:

1. **Project Title and Description**
2. **Features List**
3. **Screenshots** (optional, add later)
4. **Installation Instructions**
5. **Usage Guide**
6. **Technologies Used**
7. **Contributing Guidelines** (if open source)
8. **License** (if applicable)

## Protecting Sensitive Information

**IMPORTANT**: Never commit sensitive data!

Files to keep private (should be in .gitignore):
- `.env` (API keys, secrets)
- `local.properties` (local SDK paths)
- Any files with passwords or tokens

If you accidentally committed sensitive data:
1. Remove it from the repository
2. Change all exposed credentials immediately
3. Consider using `git filter-branch` to remove from history

## GitHub Features to Use

### 1. Releases
Create releases for different versions:
- Go to your repo → Releases → Create a new release
- Tag version (e.g., v1.0.0)
- Add release notes

### 2. Issues
Track bugs and feature requests:
- Go to your repo → Issues → New issue
- Describe the problem or feature

### 3. Projects
Organize your work:
- Go to your repo → Projects → New project
- Create boards for task management

### 4. Actions (CI/CD)
Automate testing and deployment:
- Create `.github/workflows/` folder
- Add workflow YAML files

## Useful Git Commands

```cmd
# Check status
git status

# View commit history
git log

# View changes
git diff

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branches
git merge feature-name

# Pull latest changes
git pull

# Push changes
git push

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename
```

## Repository Structure on GitHub

```
naproute/
├── .github/              # GitHub-specific files (workflows, etc.)
├── android/              # Android native code
├── ios/                  # iOS native code
├── src/                  # Source code
│   ├── components/
│   ├── screens/
│   ├── services/
│   └── ...
├── .gitignore           # Files to ignore
├── README.md            # Project documentation
├── package.json         # Dependencies
├── LICENSE              # License file (optional)
└── ...
```

## Next Steps After Upload

1. ✅ Add a LICENSE file (MIT, Apache, etc.)
2. ✅ Add screenshots to README
3. ✅ Set up GitHub Actions for CI/CD
4. ✅ Add contributing guidelines
5. ✅ Create issues for future features
6. ✅ Share your repository URL

## Collaboration

To collaborate with others:

1. **Add Collaborators**:
   - Go to repo → Settings → Collaborators
   - Add GitHub usernames

2. **Use Pull Requests**:
   - Create a branch for changes
   - Push branch to GitHub
   - Create Pull Request
   - Review and merge

3. **Code Reviews**:
   - Review pull requests before merging
   - Leave comments and suggestions
   - Approve or request changes

## Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **GitHub Desktop** (GUI alternative): https://desktop.github.com/

## Quick Reference

```cmd
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Regular workflow
git add .
git commit -m "Your message"
git push

# Update from GitHub
git pull
```

---

## Your Action Plan

1. [ ] Install Git from https://git-scm.com/download/win
2. [ ] Restart your computer
3. [ ] Configure Git with your name and email
4. [ ] Create a GitHub account (if needed)
5. [ ] Create a new repository on GitHub
6. [ ] Follow steps 3-7 above to upload your code
7. [ ] Verify your code is on GitHub
8. [ ] Share your repository URL!

**Ready to upload!** Follow the steps above and your NapRoute project will be on GitHub soon! 🚀
