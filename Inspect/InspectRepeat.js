import { readFile } from '../IO/Fs';

function inspectRepeat(filePath, funcName, callback) {
    readFile(filePath, (data) => {
        const reg = new RegExp(`test ${funcName}`);
        const alreadyHasTest = reg.test(data.toString());
        callback(alreadyHasTest);
    });
}

export {
    inspectRepeat
};