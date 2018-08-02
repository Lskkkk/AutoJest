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

async function isExistDirectory(filePath) {
    const stats = await result(promiseStats(filePath));
    return stats && stats.isDirectory();
}

// todo: 判断是否是js
async function isExistFile(filePath) {
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

    for (const sp of splitPathList) { // foreach对await无用
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
    return path.join(targetPath, sourcePath.slice(diffIndex));
}

function isDirPath(filePath) {
    const extName = path.extname(filePath);
    return extName === '';
}

// 返回文件夹路径
function getDirPath(filePath) {
    if (isDirPath(filePath)) {
        return filePath;
    } else {
        return filePath.slice(0, filePath.lastIndexOf('/'));
    }
}

/**
 * 在文件路径中插入传入的单词, 如果是文件夹，就返回此文件夹路径
 * 如：('./src/format.js', 'test') => './src/format.test.js'
 * @param {*} word 
 */
function insertSuffixToPath(filePath, word) {
    if (isDirPath(filePath)) {
        return filePath;
    } else {
        const lastPointIndex = filePath.lastIndexOf('.');
        return filePath.slice(0, lastPointIndex) + '.' + word + filePath.slice(lastPointIndex);
    }
}

/**
 * 生成sourcePath到targetPath的相对路径；
 * 如：('./src/Common/index.js', './src/Common/format.js') => './index.js'
 * 但path.relative()只会添加'..';辣鸡！需特殊判断两个文件路径的情况！
 * @param {*} sourcePath 
 * @param {*} targetPath 
 */
function getRelativePath(sourcePath, targetPath) {
    let relativePath = path.relative(targetPath, sourcePath);
    if (relativePath.match(/\//ig).length === 1 && !isDirPath(relativePath)) {
        relativePath = relativePath.replace('..', '.');
    }
    return relativePath;
}

export {
    writeFile,
    readFile,
    isExistDirectory,
    isExistFile,
    isExist,
    mkDir,

    getResolvePath,
    joinPath,
    getDirFilePathList,
    combineDiffPath,
    getDirPath,
    insertSuffixToPath,
    getRelativePath
};