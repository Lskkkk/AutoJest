import { getFuncParamList } from './common';

function processParamName(funcName, paramName) {
    return `test_${funcName}_${paramName}`;
}

function getProcessParamNameList(func) {
    const funcParamList = getFuncParamList(func);
    return funcParamList.map((param) => processParamName(func.name, param)).toString();
}

function getImportMockCode(filePath, func) {
    let content = getProcessParamNameList(func);
    content += `,${processParamName(func.name, 'result')}`;
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
    return `export {\n    ${getProcessParamNameList(func)},${processParamName(func.name, 'result')}\n};\n\n`;
}

export {
    processParamName,
    getProcessParamNameList,
    getImportMockCode,
    getMockDataCode,
    getExportMockData
};