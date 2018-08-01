import { getFuncParamList } from '../Common';

function processParamName(funcName, paramName) {
    return `test_${funcName}_${paramName}`;
}

function getProcessParamNameListToString(func) {
    const funcParamList = getFuncParamList(func);
    let paramStr = '';
    funcParamList.forEach((param, index) => {
        if (index > 0) {
            paramStr += ', ';
        }
        paramStr += processParamName(func.name, param);
    });
    return paramStr;
}

function getImportMockCode(filePath, func) {
    let content = getProcessParamNameListToString(func);
    content += `, ${processParamName(func.name, 'result')}`;
    return `import {${content}} from '${filePath}';\n\n`;
}

function getMockDataCode(func) {
    const funcParamList = getFuncParamList(func);
    let content = '';
    if (funcParamList && funcParamList.length > 0) {
        funcParamList.forEach((param) => {
            content += `const ${processParamName(func.name, param)} = null;\n\n`;
        });
    }
    content += `const ${processParamName(func.name, 'result')} = null;\n\n`;
    return content;
}

function getExportMockData(func) {
    return `export {\n    ${getProcessParamNameListToString(func)}, ${processParamName(func.name, 'result')}\n};\n\n`;
}

export {
    processParamName,
    getProcessParamNameListToString,
    getImportMockCode,
    getMockDataCode,
    getExportMockData
};