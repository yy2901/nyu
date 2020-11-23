var fs = require('fs');

var readMe = fs.readFileSync('1000w.txt', 'utf8').split('\n');
const converted = []
readMe.forEach(w=>{
    converted.push(`"${w}"`)
})
const oR = 'const words=['+String(converted)+']'
console.log(oR)

fs.appendFile('words.js', oR, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });