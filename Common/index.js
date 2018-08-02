function getFuncParamList(func) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
       result = [];
    return result;
}

function result(aPromise) {
    return aPromise
        .then((data) => data)
        .catch((err) => {
            console.error('调用promise发生错误: ' + err.message);
            return null;
        });
}

export {
    getFuncParamList,
    result
};