import { result } from '../Common';

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const promiseWriteFile = Promise.promisify(fs.writeFile);
const promiseReadFile = Promise.promisify(fs.readFile);
const promiseStats = Promise.promisify(fs.stat);
const promiseReadDir = Promise.promisify(fs.readdir);
const promiseMkDir = Promise.promisify(fs.mkdir);

// io操作
// todo: 对同一文件的多次写入使用fs.createWriteStream
async function writeFile(filePath, content) {
    await mkDir(filePath);
    await result(promiseWriteFile(filePath, content));
}

async function readFile(filePath) {
    return await result(promiseReadFile(filePath, 'utf8'));
}

async function isDirectory(filePath) {
    const stats = await result(promiseStats(filePath));
    return stats && stats.isDirectory();
}

// todo: 判断是否是js
async function isFile(filePath) {
    const stats = await result(promiseStats(filePath));
    return stats && stats.isFile();
}

async function isExist(filePath) {
    const stats = await result(promiseStats(filePath));
    return !!stats;
}

async function mkDir(filePath) {
    const dirPath = getDirPath(filePath);
    const splitPathList = dirPath.split('/');
    let currentPath = '';

    for (const sp of splitPathList) {
        if (sp === '') continue;
        
        currentPath += '/' + sp;
        const isDirExist = await isExist(currentPath);
        if (!isDirExist) {
            await result(promiseMkDir(currentPath));
        }
    }
}


// path 操作
function getResolvePath(filePath) {
    return path.resolve(filePath);
}

function joinPath(...pathList) {
    return path.join(...pathList);
}

async function getDirFilePathList(dirPath) {
    const fileList = await result(promiseReadDir(dirPath));
    return fileList.map((file) => joinPath(dirPath, file));
}

/**
 * 将源路径的部分尾路径合并到目标路径上，如：
 * './src/common/format.js', './src/test', 合并后为：
 * './src/test/common/format.js'
 * @param {*} sourcePath 
 * @param {*} targetPath 
 */
function combineDiffPath(sourcePath, targetPath) {
    let diffIndex = 0;
    while (sourcePath.charAt(diffIndex) &&
            targetPath.charAt(diffIndex) &&
            sourcePath.charAt(diffIndex) === targetPath.charAt(diffIndex)) {
        diffIndex++;
    }
    return path.join(targetPath, sourcePath.substring(diffIndex, sourcePath.length));
}

// 返回文件夹路径
function getDirPath(filePath) {
    const extName = path.extname(filePath);
    if (extName === '') {
        return filePath;
    } else {
        return filePath.substring(0, filePath.lastIndexOf('/'));
    }
}

export {
    writeFile,
    readFile,
    isDirectory,
    isFile,
    isExist,
    mkDir,

    getResolvePath,
    joinPath,
    getDirFilePathList,
    combineDiffPath,
    getDirPath
};