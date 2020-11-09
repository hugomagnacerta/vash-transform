/* external modules */
const fs = require('fs');
const { join } = require('path');
const vash = require('vash');

const fileName = join(__dirname,'resources', 'templates', 'html' , 'another.vash');
const source = fs.readFileSync(fileName, 'utf8');

vash.helpers.test = function(data){
	//console.log(vash)
	return `DATE: ${data}`;
}

var tpl = vash.compile(source.toString());


var out = tpl({ description: 'This is a test', title: 'this is a header', bottomText: 'This is a Footer'} , (err, ctx) => ctx.finishLayout());

console.log(out);

