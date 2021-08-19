# Package Instructions

## Installation

NPM:

```bash
npm i @epubknowledge/entityverter
```

Yarn:

```bash
yarn add @epubknowledge/entityverter
```

## Usage

```bash
const entityverter = require('@epubknowledge/entityverter)
```

Package has four parameters to operate:

```bash
entityverter(input, output, result, cli)
```

Breakdown of each:

- `input`: absolute file path to be worked on. Can take just the filename and it will build an absolute path.
- `output`: absolute file path if not wanting the package to overwrite the `input` file.
- `result`: JSON object that indicates what was replaced in the file. If set to `true` and nothing is replaced it will return `false`.
- `cli`: This detects wether this is being used as a CLI or package, package default is set to `false`.
