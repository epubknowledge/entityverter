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

Package takes three inputs:

```bash
entityverter(input, output, result)
```

Breakdown of each:

- `input`: absolute file path to be worked on
- `output`: absolute file path if not wanting the package to overwrite the `input` file
- `result`: JSON object that indicates what was replaced in the file
