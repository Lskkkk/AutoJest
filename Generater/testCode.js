function analyzeFunc(func) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
       result = [];
    return result;
}

function getTestCode(func) {
    const funcParamList = analyzeFunc(func);
    const funcName = func.name;
    return `test(\'test ${funcName}\', () => {\n    expect(${funcName}(${funcParamList.toString()})).toEqual(result);\n});\n\n`;
}

export {
    getTestCode
};