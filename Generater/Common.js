function getFuncParamList(func) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
       result = [];
    return result;
}

function tryRequire(filePath) {
    try {
        const defaultFunc = require(filePath);
        return defaultFunc;
    } catch (e) {
        console.error(e.message + ' in \'Generater/Common.js/tryRequire\'');
    }
    return null;
}

export {
    getFuncParamList,
    tryRequire
};