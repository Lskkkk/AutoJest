const testCodeGenerator = require('./Generater/testCode');
const fs = require('fs');
fs.writeFile('./Example/SomeFunction.test.js', testCodeGenerator.getTestCode('plus', 'a', 'b'), (err) => {
    if (err) {
        return console.error(err.message);
    }
    fs.readFile('./Example/SomeFunction.test.js', (err2, data) => {
        console.log(data.toString());
    });
});
