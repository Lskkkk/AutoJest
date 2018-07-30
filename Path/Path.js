const ROOT_PATH = './Example';

const TEST_REG = '*.test.*';

const FILE_EXTENSION_REG = new RegExp('*.ts || *.js');
const NOT_DIRECTORY_REG = new RegExp('.');

const path = require('path');

function _getResolvePath(dirPath, filePath) {
    return path.resolve(dirPath, filePath);
}

// 遍历所有待测试文件
function traversingTestFile(callback) {
    const absRootPath = _getResolvePath(__dirname, ROOT_PATH);
}

function _recursiveFile(filePath, callback) {
    if (!NOT_DIRECTORY_REG.test(path.basename(filePath))) {
        // 是文件夹
        _recursiveFile(filePath)
    }
}

// 根据待测试文件路径获取测试用例文件路径
function getTestSuiteFilePath(testFilePath, callback) {

}

// 根据待测试文件路径获取mock数据文件路径
function getTestMockFilePath(testFilePath, callback) {

}

export {
    traversingTestFile,
    getTestSuiteFilePath,
    getTestMockFilePath
};
