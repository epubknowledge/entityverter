fs = require('fs')

// Simple boolean test if it exists
module.exports = route => (fs.existsSync(route) === true ? true : false)
