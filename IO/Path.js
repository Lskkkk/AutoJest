const ROOT_PATH = './Example';

const path = require('path');

function getTestDirPath() {
    return path.resolve(__dirname, ROOT_PATH);
}

export {
    getTestDirPath
};
