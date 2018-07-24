import { processParamName, getProcessParamNameList } from './MockDataCode';

function getImportFuncCode(filePath, func) {
    return `import {${func.name}} from '${filePath}';\n\n`;
}

function getTestCode(func) {
    const funcName = func.name;
    const funParamString = getProcessParamNameList(func);
    return `test(\'test ${funcName}\', () => {\n    expect(${funcName}(${funParamString})).toEqual(${processParamName(func.name, 'result')});\n});\n\n`;
}

export {
    getImportFuncCode,
    getTestCode
};