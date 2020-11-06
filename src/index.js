/* external modules */
const fs = require('fs');
const { join } = require('path');
const vash = require('vash');

/* internal modules */
const jsonData = require('./resources/json/data.json');

const fileName = join(__dirname,'resources', 'templates', 'basic.vash');
const source = fs.readFileSync(fileName, 'utf8');

var tpl = vash.compile(source);

var out = tpl(jsonData);

console.log(out);

fs.writeFileSync("./resources/results/result.json", out, { encoding: 'utf8' });