import { result } from '../Common';

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const promiseWriteFile = Promise.promisify(fs.appendFile);
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
 * 在文件路径中插入传入的单词, 如果是文件夹，就返回此文件夹路径;
 * 如：('./src/format.js', 'test') => './src/format.test.js';
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
 * 生成sourceFilePath到targetFilePath的相对路径，只适用于文件路径;
 * 如：('./src/Common/index.js', './src/Common/format.js') => './index.js';
 * path.relative()只能作用于文件夹路径，因此写了这个方法作为补充;
 * @param {*} sourceFilePath 
 * @param {*} targetFilePath 
 */
function getRelativeFilePath(sourceFilePath, targetFilePath) {

    const sourcePathList = sourceFilePath.split('/').filter((w) => w !== '');
    const targetPathList = targetFilePath.split('/').filter((w) => w !== '');
    
    let differentIndex = Math.min(sourcePathList.length, targetPathList.length);
    for (let i = 0; i < differentIndex; i++) {
        if (sourcePathList[i] !== targetPathList[i]) {
            differentIndex = i;
            break;
        }
    }

    // 返回单层文件路径，如 './index.js'
    if (sourcePathList.length - differentIndex === 1) {
        return `./${sourcePathList[differentIndex]}`;
    }

    // 返回多层路径，使用'../'
    let outPutList = [];
    for (let i = targetPathList.length - 1; i > differentIndex; i--) {
        outPutList.push('..');
    }
    outPutList = outPutList.concat(sourcePathList.slice(differentIndex));
    return outPutList.join('/');
}

/**
 * 判断前一个路径是否属于后一个路径
 * @param {*} filePath 
 * @param {*} dirPath 
 */
function isPathBelong(filePath, dirPath) {
    return getResolvePath(filePath).indexOf(getResolvePath(dirPath)) >= 0;
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
    getRelativeFilePath,
    isPathBelong
};