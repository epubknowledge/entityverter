#!/usr/bin/env node

const program = require('commander')

const { name, version, description } = require('../package.json')
const intro = require('./intro')
const main = require('../bin/index')

const cli = () => {
  intro()

  program
    .version(version)
    .name(name)
    .description(description)
    .option('-i, --input [folder]', 'Directory to be piped in', process.cwd())
    .option('-o, --output [folder]', 'Directory file should be written to', process.cwd())
    .action(async () => {
      const { input, output } = program._optionValues
      await main(input, output)
    })

  program.parse(process.argv)
}

cli()
