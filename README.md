![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/epubknowledge/px-to-em) ![Code Climate issues](https://img.shields.io/codeclimate/issues/epubknowledge/px-to-em) ![Github code size](https://img.shields.io/github/languages/code-size/epubknowledge/px-to-em) ![GitHub issues](https://img.shields.io/github/issues/epubknowledge/px-to-em) ![GitHub last commit](https://img.shields.io/github/last-commit/epubknowledge/px-to-em) [![GitHub forks](https://img.shields.io/github/forks/epubknowledge/px-to-em)](https://github.com/epubknowledge/px-to-em/network) [![GitHub stars](https://img.shields.io/github/stars/epubknowledge/px-to-em)](https://github.com/epubknowledge/px-to-em/stargazers) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/epubknowledge/px-to-em)

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
