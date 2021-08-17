#!/usr/bin/env node

const objectSetup = require('../common/objectSetup')
const { remove } = require('../common/tmp')
const resetMem = require('../common/resetMemory')

module.exports = async (i, o = false, cli = false) => {
  const ebookObj = objectSetup(i, o) // Foundation object for package
  ebookObj.cli = cli // Add CLI boolean

  console.log(ebookObj) // echo object

  remove(ebookObj.tmp) // Remove tmp directory
  resetMem() // Reset variable in memory to remove conflict with Boilerplate
}
