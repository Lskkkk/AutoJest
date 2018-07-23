import { readFile, writeFile } from './IO/Fs';
import { getTestCode } from './Generater/TestCode';
import { getMockDataCode } from './Generater/MockDataCode';

// demo 1: 多个export
import * as TestFuncs from './Example/SomeFunction';
(function runDemo1() {
    let content = '';
    for (let i in TestFuncs) {
        content += getTestCode(TestFuncs[i]);
    }
    writeFile('./Example/SomeFunction.test.js', content);
    // readFile('./Example/SomeFunction.test.js', (data) => console.log(data));
})();

// demo 2: export default
import * as TestDefaultFunc from './Example/DefaultFunction';
(function runDemo2() {
    writeFile('./Example/SomeFunction.test.js', getTestCode(TestDefaultFunc.default));
    // readFile('./Example/SomeFunction.test.js', (data) => console.log(data));
})();

console.log(getMockDataCode(TestDefaultFunc.default));