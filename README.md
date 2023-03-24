# Git Change Logger

The Git Change Logger is a Node.js utility meant to create a simple change log based off of commit messages.

When making commits, use keywords `bugfix: ` or `bf: ` followed by a description of the bug fixed to denote a bugfix. Use keywords `feature: ` or `feat: ` followed by a description of the feature added to denote a feature add. If a commit has multiple, they can be seperated by a `;` and then continued like before.

## Examples

Example of bugfix:

```bash
git commit -m "bugfix: Fixed an issued with tasks losing their assigned personnel when the due date change."
# or
git commit -m "bf: Fixed an issued with tasks losing their assigned personnel when the due date change."
```

Example of feature:

```bash
git commit -m "feature: Added a feature where users can use a calendar to schedule when people are working."
# or
git commit -m "feat: Added a feature where users can use a calendar to schedule when people are working."
```

Example of both a feature add and a bugfix:

```bash
git commit -m "feature: Added a feature where users can use a calendar to schedule when people are working.; bugfix: Fixed an issued with tasks losing their assigned personnel when the due date change."
# or
git commit -m "feat: Added a feature where users can use a calendar to schedule when people are working.; bf: Fixed an issued with tasks losing their assigned personnel when the due date change."
```

After you have a repo ready to run the Git Change Logger on, run this command:

```bash
node index.js path/to/repo
```

The Git Change Logger will now have a change-log.html file in it that you can use for showing changes.

## Notes

- The Git Change Logger uses Node.js to run, but the repos it is used on do not need to be Node.js apps. Git Change Logger can run on any git repo.
- If you experience any bugs or have thoughts on future improvements, please feel free to open an issue.
