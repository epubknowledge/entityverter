![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/epubknowledge/entityverter) ![Code Climate issues](https://img.shields.io/codeclimate/issues/epubknowledge/entityverter) ![Github code size](https://img.shields.io/github/languages/code-size/epubknowledge/entityverter) ![GitHub issues](https://img.shields.io/github/issues/epubknowledge/entityverter) ![GitHub last commit](https://img.shields.io/github/last-commit/epubknowledge/entityverter) [![GitHub forks](https://img.shields.io/github/forks/epubknowledge/entityverter)](https://github.com/epubknowledge/entityverter/network) [![GitHub stars](https://img.shields.io/github/stars/epubknowledge/entityverter)](https://github.com/epubknowledge/entityverter/stargazers) ![npm](https://img.shields.io/npm/v/@epubknowledge/entityverter)

# Entityverter

A NPM package that converts a file's entities from name and rendered to their respected numerical value. If a bad entity is found it will be deleted.

## Basic Usage

NPM:

```bash
npm i @epubknowledge/entityverter
```

yarn:

```bash
yarn add @epubknowledge/entityverter
```

## CLI

Install to NPM:

```bash
cd entityverter && npm i && npm link
```

In the terminal:

```
evcli -i file.xhtml
```

If using this as a CLI and wanting advanced documentation it can be found at **[CLI documentation](./docs/cli.md)**.

## Package

This can take two arguments:

- `data`: The content going in that will be traversed
- `results`: Wether or not you want to know what was changed which would change the return from string to an object.

```bash
const entityverter(data, results)
```

If using this as a package and wanting advanced documentation it can be found a **[Package documentation](./docs/package.md)**.
