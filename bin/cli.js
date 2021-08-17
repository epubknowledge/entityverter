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
    .option('-i, --input [file]', 'File to read in to be converted', false)
    .option('-r, --result [boolean]', 'Directory to be piped in', false)
    .option('-o, --output [folder]', 'Directory file should be written to', false)
    .action(async () => {
      const { input, result, output, cli = true } = program._optionValues
      await main(input, result, output, cli)
    })

  program.parse(process.argv)
}

cli()