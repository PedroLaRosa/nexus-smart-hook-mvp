---
name: new-functionality
description: Create new functionalities following good practices like TDD and always keep the same folder structure. Use this skill when adding a new functionality to the project.
---

## Before implementing

1- Check the project rules, especially @.claude/rules/practices-tdd.md, @.claude/rules/practices-testing.md, and @.claude/rules/practices-inside-out.md
2- Use the module `health` as a reference for the code structure
3- Present the complete plan to me before writing code

## Important

Follow strict TDD (Reason->Red->Green->Refactor->Reevaluate)
Develop inside-out (Domain -> use cases -> Adapters -> HTTP)
Ask any questions you need before starting
