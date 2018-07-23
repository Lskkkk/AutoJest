import { getFuncParamList } from './Common';

function getImportCode(path, func) {
    return `import `;
}

function getTestCode(func) {
    const funcParamList = getFuncParamList(func);
    const funcName = func.name;
    const funParamString = funcParamList && funcParamList.length > 0 ? funcParamList.toString() : '';
    return `test(\'test ${funcName}\', () => {\n    expect(${funcName}(${funParamString})).toEqual(result);\n});\n\n`;
}

export {
    getTestCode
};