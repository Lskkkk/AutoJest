import { readFile } from '../IO/Fs';

async function inspectRepeat(filePath, funcName) {
    const readData = await readFile(filePath);
    const reg = new RegExp(`test ${funcName}`);
    return reg.test(readData.toString());
}

export {
    inspectRepeat
};