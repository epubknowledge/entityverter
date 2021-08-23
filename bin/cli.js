#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

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
    .option('-o, --output [file]', 'File to write to if not overwriting', false)
    .action(async () => {
      const { input, result, output, cli = true } = program._optionValues
      if (input === false) {
        console.log(chalk.red('Error:'), chalk.white(`File not specified.\n`))
        program.help()
      }
      await main(input, result, output, cli)
    })

  program.parse(process.argv)
}

cli()
