# Github Lint

A CLI utility to lint Github repositories.

## Getting started

This project is built with Node.js and Typescript.

### Clone the repository

To get started, clone the repository:

```bash
git clone
cd github-lint
npm install
```

### Environment variables

Keep in mind that you should set up a Github Personal Access Token to use the
CLI. You can do so by setting the `GITHUB_API_TOKEN` environment variable. If you
don’t know how to retrieve that, check out [ this guide on creating personal access tokens ](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).

You can also set the `GITHUB_API_TOKEN` environment variable in a `.env` file in
the root of the project. Then, you can run the project with:

```bash
npm run dev
```

You can also build it and test it like a normal CLI:

```bash
npm run build
npm link
```

```bash
npx env-cmd -f .env ghlint lint -u <GITHUB_REPO_URL>
```
