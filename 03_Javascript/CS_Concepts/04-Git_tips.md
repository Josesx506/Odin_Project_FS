### Update a commit
After committing a file/bunch of files, you can include additional files in the commit using 
```bash
git add newfile.txt
git commit --amend
```

### Updating multiple commits
- Rebase is an action to rewrite commits and their history. `git rebase -i` is a command which allows us to interactively stop after each commit 
we’re trying to modify, and then make whatever changes we wish. We do have to tell this command which is the last commit we want to edit. For 
example, `git rebase -i HEAD~2` allows us to edit the last two commits.
- After editing a commit, use `git commit --amend` to update the changes to the commit.
- Complete the rebase with `git rebase --continue`.


### Merging multiple commits
Two or more commits can be merged using `squash` with the git interactive terminal commands. To force push changes from local to remote, 
`git push --force` can be used, however, it can delete remote files that have been modified when working with a team, hence it's recommended to 
use `git push --force-with-lease` instead.

### Recommendations
1. For `git commit --amend` never amend commits that have been pushed to remote repositories.
2. For `git rebase` never rebase a repository that others may work off of.
3. For `git reset` never reset commits that have been pushed to remote repositories.
4. For `git push --force` only use it when appropriate, use it with caution, and preferably default to using `git push --force-with-lease`.
5. View one git commit logs with `alias glg='git log --oneline --abbrev-commit --all --graph --decorate --color'`