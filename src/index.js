/* external modules */
const fs = require('fs');
const { join } = require('path');
const vash = require('vash');

/* internal modules */
const jsonData = require('./resources/json/data.json');

vash.helpers.toDate = date => {
    if ( !date ) return 'N/A';

    let dateWithFormat = new Date(date);

    return dateWithFormat.toISOString();
}

vash.helpers.toJsonString = string => {
    if ( !string ) return 'N/A';
    //process string data
    return string;
} 

//Reading Credentials Template
const credentialsFileName = join(__dirname,'resources', 'templates', 'json', 'credentials.vash');
const credentialsSource = fs.readFileSync(credentialsFileName, 'utf8');

//Executing template engine for credentials 
const credentialsTemplate = vash.compile(credentialsSource,  {
    //useWith: true,
    helpersName: 'json'
});

let credentialsJsonOut = credentialsTemplate(jsonData.subject);

jsonData.credentialSubject = credentialsJsonOut;

const mainFileName = join(__dirname,'resources', 'templates', 'json', 'main.vash');
const mainSource = fs.readFileSync(mainFileName, 'utf8');

const mainTemplate = vash.compile(mainSource,  {
    //useWith: true,
    helpersName: 'json'
});

let out = mainTemplate(jsonData);

out = out.split('&quot;').join('"');

console.log(out);

fs.writeFileSync("./resources/results/result.json", out, { encoding: 'utf8' });