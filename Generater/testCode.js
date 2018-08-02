import { processParamName, getProcessParamNameListToString } from './MockDataCode';

function getImportFuncCode(writtenFilePath, func, isDefaultExport) {
    if (isDefaultExport) {
        return `import ${func.name} from '${writtenFilePath}';\n\n`;
    }
    return `import {${func.name}} from '${writtenFilePath}';\n\n`;
}

function getTestCode(func) {
    const funcName = func.name;
    const funParamString = getProcessParamNameListToString(func);
    return `test(\'test ${funcName}\', () => {\n    expect(${funcName}(${funParamString})).toEqual(${processParamName(func.name, 'result')});\n});\n\n`;
}

export {
    getImportFuncCode,
    getTestCode
};