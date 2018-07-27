const ROOT_PATH = './Example';

const TEST_REG = '*.test.*';

const path = require('path');

function getTestDirPath() {
    return path.resolve(__dirname, ROOT_PATH);
}

function traversingTestFile(dirPath, callback) {
    
}

export {
    getTestDirPath
};
