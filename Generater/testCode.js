import { processParamName, getProcessParamNameListToString } from './MockDataCode';
import { tryRequire } from '../Common';

function getImportFuncCode(filePath, func, realFilePath) {
    let code = '';
    const requireResult = tryRequire(realFilePath);
    if (!!(requireResult && requireResult.default)) {
        code = `import ${func.name} from '${filePath}';\n\n`;
    } else {
        code = `import {${func.name}} from '${filePath}';\n\n`;
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