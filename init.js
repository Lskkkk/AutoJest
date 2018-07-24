import { readFile, writeFile } from './IO/Fs';
import { getTestCode, getImportFuncCode } from './Generater/TestCode';
import { getImportMockCode, getMockDataCode, getExportMockData } from './Generater/MockDataCode';

// demo 1: 多个export
import * as TestFuncs from './Example/SomeFunction';
(function runDemo1() {

    // test.js的内容
    let importFuncsCode = '';
    let importMockDataCode = '';
    let testCode = '';

    // mock.js的内容
    let mockDataCode = '';

    for (let i in TestFuncs) {
        importFuncsCode += getImportFuncCode('./SomeFunction', TestFuncs[i]);
        importMockDataCode += getImportMockCode('./SomeFunction.mock', TestFuncs[i]);
        testCode += getTestCode(TestFuncs[i]);

        mockDataCode += getMockDataCode(TestFuncs[i]) + getExportMockData(TestFuncs[i]);
    }

    // 写入
    writeFile('./Example/SomeFunction.test.js', importFuncsCode + importMockDataCode + testCode);
    writeFile('./Example/SomeFunction.mock.js', mockDataCode);
})();

// demo 2: export default
// import * as TestDefaultFunc from './Example/DefaultFunction';
// (function runDemo2() {
//     writeFile('./Example/SomeFunction.test.js', getTestCode(TestDefaultFunc.default));
//     // readFile('./Example/SomeFunction.test.js', (data) => console.log(data));
// })();
