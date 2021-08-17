fs = require('fs')

module.exports = route => (fs.existsSync(route) === true ? true : false) // Simple boolean test if it exists
