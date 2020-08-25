const fs = require('fs').promises;

const readFile = (file) => fs.readFile(file);

module.exports = { readFile };
