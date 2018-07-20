const getTestCode = (funcName, param1, param2) => {
    return `test(\'test ${funcName}\', () => {\n    expect(${funcName}(${param1})).toEqual(${param2});\n});`;
};

module.exports = {
    getTestCode
};