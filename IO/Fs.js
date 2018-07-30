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

function isDirectory(path, callBack) {
    fs.stat(path, function (err, stats) {
        console.log(callBack(stats.isDirectory()));
    });
}

function isFile(path, callBack) {
    fs.stat(path, function (err, stats) {
        console.log(callBack(stats.isFile()));
    });
}

function traversingFileListInDir(path, callBack) {
    fs.readdir(path,function(err, files){
        if (err) {
            return console.error(err);
        }
        files.forEach((fileName) => callBack(fileName));
    });
}

export {
    writeFile,
    readFile,
    isDirectory,
    isFile,
    traversingFileListInDir
};