import { processParamName, getProcessParamNameListToString } from './MockDataCode';
import { tryRequire } from '../Common';

function getImportFuncCode(writtenFilePath, func, realFilePath) {
    const requireResult = tryRequire(realFilePath);
    if (!!requireResult) return '';

    let code = '';
    if (!!requireResult.default) {
        code = `import ${func.name} from '${writtenFilePath}';\n\n`;
    } else {
        code = `import {${func.name}} from '${writtenFilePath}';\n\n`;
    }
    return code;
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