module.exports = () => {
  // Reset ebookObj in memory to eliminate conflict with boilerplate
  if (global.ebookObj && global.ebookObj !== null) global.ebookObj = null
  if (global.content && global.content !== null) global.content = null
}
