const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const promiseFs = Promise.promisifyAll(fs);

// io操作
// todo: 对同一文件的多次写入使用fs.createWriteStream
function writeFile(path, content) {
    promiseFs.writeFile(path, content, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

async function readFile(path) {
    return promiseFs.readFile(path, 'utf8');
}

async function isDirectory(path) {
    const stats = await promiseFs.stat(path);
    return stats.isDirectory();
}

// todo: 判断是否是js
async function isFile(path) {
    const stats = await promiseFs.stat(path);
    return stats.isFile();
}

function isExist(path) {
    return fs.existsSync(path);
}


// path 操作
function getResolvePath(dirPath, filePath) {
    return path.resolve(dirPath, filePath);
}

async function getDirFilePathList(dirPath) {
    const fileList = await promiseFs.readdir(dirPath) || [];
    return fileList.map((file) => getResolvePath(dirPath, file));
}

/**
 * 将源路径的部分尾路径合并到目标路径上，如：
 * './src/common/format.js', './src/test', 合并后为：
 * './src/test/common/format.js'
 * @param {*} sourcePath 
 * @param {*} targetPath 
 */
function combineDiffPath(sourcePath, targetPath) {

}

export {
    writeFile,
    readFile,
    isDirectory,
    isFile,
    isExist,

    getResolvePath,
    getDirFilePathList,
    combineDiffPath
};