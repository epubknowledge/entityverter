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

    if (ebookObj.results.status === false) return ebookObj.data
    if (ebookObj.results.status === true && ebookObj.results.data !== false) {
      return {
        content: ebookObj.data,
        results: {
          totalCount: ebookObj.results.data.symbol.totalCount,
          replaced: ebookObj.results.data.symbol.replaced,
        },
      }
    } else {
      return {
        content: ebookObj.data,
        results: false,
      }
    }
  } catch (e) {
    return { error: e.message }
  }
}
