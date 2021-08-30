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
