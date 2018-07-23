import { getFuncParamList } from './common';

function getMockDataCode(func) {
    const funcParamList = getFuncParamList(func);
    let content = '';
    if (funcParamList && funcParamList.length > 0) {
        funcParamList.forEach((param) => {
            content += `const test_${func.name}_${param} = null;\n\n`;
        });
    }
    content += `const test_${func.name}_result = null;\n\n`;
    return content;
}

export {
    getMockDataCode
};