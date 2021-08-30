#!/usr/bin/env node

const { entSetup, entFormat, entCalculate } = require('../src/entity')

module.exports = async (data = false, results = false) => {
  try {
    if (data === false) throw new Error(`data not passed`)
    let ebookObj = {
      data,
      results,
    }

    ebookObj.entities = entSetup(ebookObj)
    ebookObj = await entFormat(ebookObj)
    ebookObj = await entCalculate(ebookObj)

    if (ebookObj.results.status === true) {
      const results =
        ebookObj.results.data === false
          ? { status: true, data: false }
          : {
              totalCount: ebookObj.results.data.symbol.totalCount,
              replaced: ebookObj.results.data.symbol.replaced,
            }
      return {
        content: ebookObj.data,
        results,
      }
    }
    return ebookObj.data
  } catch (e) {
    return { error: e.message }
  }
}
