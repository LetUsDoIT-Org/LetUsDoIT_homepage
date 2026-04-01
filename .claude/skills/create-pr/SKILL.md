---
name: create-pr
description: Create a pull request from dev to main. Creates PR first with placeholder, reads GitHub's commits for accurate description, then updates. Use when user says "create pr", "/pr", "make a pr", or "pull request".
model: sonnet
---

# Create Pull Request

Create PRs from `dev` to `main` with accurate descriptions using a **create-first, describe-second** approach.

**Announce:** "I'm using the create-pr skill to create a pull request."

## Auto-Detection

Detect org and repo from git remote:
```bash
REMOTE=$(git remote get-url origin)
ORG=$(echo "$REMOTE" | sed -E 's/.*[:/]([^/]+)\/[^/]+(\.git)?$/\1/')
REPO=$(echo "$REMOTE" | sed -E 's/.*[:/][^/]+\/([^/]+)(\.git)?$/\1/')
```

## Why Create-First

- Local git refs (`origin/main`, `origin/dev`) may be stale — Claude cannot fetch
- GitHub automatically calculates the exact diff when a PR is created
- Reading the PR's commits gives the authoritative list

## Workflow

### Step 1: Create PR with Placeholder

```bash
gh pr create \
  --repo "$ORG/$REPO" \
  --title "Release: dev to main" \
  --head dev \
  --base main \
  --body "Generating description..."
```

Extract the PR number from the returned URL.

### Step 2: Read PR Commits

```bash
gh pr view <pr-number> --repo "$ORG/$REPO" --json commits
```

### Step 3: Generate Description

**Categorize commits:**
- `feat:` → Features
- `fix:` → Bug Fixes
- `docs:` → Documentation
- `test:` → Tests
- `refactor:`, `chore:` → Technical changes

**PR Title:**
- Single feature/fix: use that commit message
- Multiple changes: summary like "Release: [main feature] and fixes"

**PR Body:**
```markdown
## Summary

### Features
- [list feat: commits]

### Bug Fixes
- [list fix: commits]

### Technical
- [list other commits if relevant]

## Test plan
- [ ] [relevant test items]

Closes #[issue-number] (if applicable)
```

### Step 4: Update PR

```bash
gh pr edit <pr-number> \
  --repo "$ORG/$REPO" \
  --title "<generated-title>" \
  --body "<generated-body>"
```

### Step 5: Report

```
Pull request created:
- PR: [url]
- Commits: [count]
- [brief summary]
```

## Quick Reference

| Step | Action | Command |
|------|--------|---------|
| 1 | Create PR | `gh pr create --base main --head dev` |
| 2 | Read commits | `gh pr view --json commits` |
| 3 | Generate description | Parse commit messages |
| 4 | Update PR | `gh pr edit` |

## Red Flags

**Never:**
- Use local git refs for branch comparison
- Create PR from main to dev (always dev → main)
- Leave PR with placeholder description
- Guess at what commits are included

**Always:**
- Create PR first with minimal body
- Read commits from GitHub's PR response
- Update PR with accurate description
- Target `base: "main"` in PR creation
