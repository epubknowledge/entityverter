#!/usr/bin/env node

const chalk = require('chalk') // https://www.npmjs.com/package/chalk

const objectSetup = require('../common/objectSetup')
const { remove } = require('../common/tmp')
const resetMem = require('../common/resetMemory')
const { readFile, fileWriter, jsonWriter } = require('../common/file')
const { entSetup, entFormat, entCalculate } = require('../src/entity')
const { introName } = require('../package.json')

module.exports = async (i = false, r = false, o = false, cli = false) => {
  if (i === false) {
    if (cli === true) {
      console.log(chalk.red('Error:'), chalk.white(`File path not specified`))
      process.exit(1)
    } else {
      return {
        error: `File path not specified`,
      }
    }
  }

  ebookObj = objectSetup(i, r, o, cli) // Foundation object for package
  ebookObj.data = readFile(ebookObj.input)

  ebookObj.entities = entSetup(ebookObj)
  ebookObj = await entFormat(ebookObj)
  ebookObj = await entCalculate(ebookObj)

  if (ebookObj.cli === true) {
    fileWriter(ebookObj.output, ebookObj.data)
    if (ebookObj.results.status === true && ebookObj.results.data !== false) {
      const resObj = {
        file: ebookObj.file.fullName,
        results: ebookObj.results.data,
      }
      jsonWriter(`${ebookObj.file.parent}/${ebookObj.file.name}.entity-results.json`, resObj)
    }

    ebookObj.results.data === false
      ? console.log(
          chalk.green('Completed'),
          chalk.blue(introName),
          chalk.white(`| No entity issues found in file:`),
          chalk.green(ebookObj.file.fullName),
        )
      : console.log(
          chalk.green('Completed'),
          chalk.blue(introName),
          chalk.white('on file'),
          chalk.green(ebookObj.file.fullName),
        )
  } else {
    if (ebookObj.results.status === false) return ebookObj.data
    return {
      data: ebookObj.data,
      results: {
        totalCount: ebookObj.results.data.symbol.totalCount,
        replaced: ebookObj.results.data.symbol.replaced,
      },
    }
  }
  remove(ebookObj.tmp) // Remove tmp directory
  resetMem() // Reset variable in memory to remove conflict with Boilerplate
}
