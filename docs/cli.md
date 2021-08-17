# CLI Instructions

## Installation

NPM:

```bash
npm i @epubknowledge/entityverter
```

Yarn:

```bash
yarn add @epubknowledge/entityverter
```

After downloaded install the dependencies:

```bash
npm i
```

Link:

```bash
npm run link
```

Want it removed:

```bash
npm run unlink
```

## Usage

basic usageL

```bash
evcli -e file.tx
```

If a file is not specified to the `-e` flag then the CLI will throw an error in the terminal.

## Help

If needing to know all the commands run:

```bash
evcli --help
```

## Options

### Input

This is the file that should be passed into the CLI. If a file isn't detected it will error out in the terminal. This has two usable flags:

- `--input`: verbose
- `-i`: shorthand

### Results

In case wanting to know what entities were replaced this takes a `result` flag. By default this is set to `false` but this has two usable flags:

- `--result`: verbose
- `-r`: shorthand

Example usage:

```bash
evcli -i file.json -r
```

Will be written to the parent directory specified in `output` with a file named `entity-results.json`. If no entities are found then nothing will be written to a file.

### Output

By default this is set to `false` and overwrites the file specified in `input`. If the destination needs to be somewhere different the it should be passed in with either the two flags:

- `--output`: verbose
- `-o`: shorthand

Example:

```bash
evcli -i file.json -o path/to/new/file.json
```
