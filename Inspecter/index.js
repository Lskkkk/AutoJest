import { isPathBelong } from '../File';

function inspectRepeat(fileContent, funcName) {
    const reg = new RegExp(`test ${funcName}`);
    return fileContent && reg.test(fileContent);
}

/**
 * 检查文件是否是目标文件，根据传入的配置规则检查
 * @param {*} filePath 
 * @param {Config} configObj
 */
function inspectAimFile(filePath, configObj) {
    // 这里判断目标文件为true的情况太多种，反向考虑比较好
    const isNotAim = (configObj.aimPathList.length > 0 && configObj.aimPathList.every((configPath) => !isPathBelong(filePath, configPath))) &&
        (configObj.aimRegExpStrList.length > 0 && configObj.aimRegExpStrList.every((aimReg) => !new RegExp(aimReg).test(filePath)));

    const isExclude = configObj.excludeRegExpStrList.length > 0 && configObj.excludeRegExpStrList.some((aimReg) => new RegExp(aimReg).test(filePath));
    return !isNotAim && !isExclude;
}

export {
    inspectRepeat,
    inspectAimFile
};