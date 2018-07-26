const fs = require('fs');

// todo: 对同一文件的多次写入使用fs.createWriteStream
function writeFile(path, content) {
    fs.writeFile(path, content, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

function readFile(path, callBack) {
    fs.readFile(path, 'utf8', (err, data) => {
        console.log(err);
        callBack(data);
    });
}

export {
    writeFile,
    readFile
};