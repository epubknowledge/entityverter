#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

const { name, version, description, introName } = require('../package.json')
const { remove } = require('../common/tmp')
const intro = require('./intro')
const objectSetup = require('../common/objectSetup')
const { readFile, fileWriter } = require('../common/file')
const resetMem = require('../common/resetMemory')

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
      try {
        const { input, result, output, cli = true } = program._optionValues
        if (input === false) {
          console.log(chalk.red('Error:'), chalk.white(`File not specified.\n`))
          program.help()
        }
        ebookObj = objectSetup(input, result, output, cli)
        ebookObj.data = readFile(ebookObj.input)
        ebookObj.data = await main(ebookObj.data, result)

        if (result === false) {
          fileWriter(ebookObj.output, ebookObj.data)
          console.log(
            chalk.green('Completed'),
            chalk.blue(introName),
            chalk.white('on file'),
            chalk.green(ebookObj.file.fullName),
          )
        } else {
          if (ebookObj.data.results === false) {
            console.log(
              chalk.green('Completed'),
              chalk.blue(introName),
              chalk.white(`| No entity issues found in file:`),
              chalk.green(ebookObj.file.fullName),
            )
          } else {
            const resObj = {
              file: ebookObj.file.fullName,
              results: ebookObj.data.results,
            }
            fileWriter(
              `${ebookObj.file.parent}/${ebookObj.file.name}.entity-results.json`,
              resObj,
              true,
            )
            fileWriter(ebookObj.output, ebookObj.data.content)
          }
        }

        remove(ebookObj.tmp) // Remove tmp directory
        resetMem() // Reset variable in memory to remove conflict with Boilerplate
      } catch (e) {
        console.log(chalk.red('Error:'), chalk.white(e.message))
        process.exit(1)
      }
    })

  program.parse(process.argv)
}

cli()

// console.log()
