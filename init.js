import * as SF from './File';
import * as GTC from './Generater/TestCode';
import * as GMDC from './Generater/MockDataCode';

// demo 1: 多个export
(async function runDemo1() {
    const TestFuncs = await Promise.resolve(import('./Example/Normal/SomeFunction'));

    // test.js的内容
    let importFuncsCode = '';
    let importMockDataCode = '';
    let testCode = '';

    // mock.js的内容
    let mockDataCode = '';

    for (let i in TestFuncs) {
        importFuncsCode += GTC.getImportFuncCode('./Normal/SomeFunction', TestFuncs[i], '../Example/Normal/SomeFunction');
        importMockDataCode += GMDC.getImportMockCode('./SomeFunction.mock', TestFuncs[i]);
        testCode += GTC.getTestCode(TestFuncs[i]);

        mockDataCode += GMDC.getMockDataCode(TestFuncs[i]) + GMDC.getExportMockData(TestFuncs[i]);
    }

    // 写入
    SF.writeFile('./Example/SomeFunction.test.js', importFuncsCode + importMockDataCode + testCode);
    SF.writeFile('./Example/SomeFunction.mock.js', mockDataCode);
});

// demo 2: export default
// import * as TestDefaultFunc from './Example/Default/DefaultFunction';
(async function runDemo2() {
    const TestDefaultFunc = await Promise.resolve(import('./Example/Default/DefaultFunction'));

    // test.js的内容
    const importFuncsCode = GTC.getImportFuncCode('./Default/DefaultFunction', TestDefaultFunc.default, '../Example/Default/DefaultFunction');
    const importMockDataCode = GMDC.getImportMockCode('./DefaultFunction.mock', TestDefaultFunc.default);
    const testCode = GTC.getTestCode(TestDefaultFunc.default);

    // mock.js的内容
    const mockDataCode = GMDC.getMockDataCode(TestDefaultFunc.default) + GMDC.getExportMockData(TestDefaultFunc.default);

    // 写入
    SF.writeFile('./Example/DefaultFunction.test.js', importFuncsCode + importMockDataCode + testCode);
    SF.writeFile('./Example/DefaultFunction.mock.js', mockDataCode);
});


/**
 * 模拟自动初始化的方法
 * 1. 读取待测文件目录；
 * 2. 遍历每个文件；
 * 3. 针对每个文件，检查对应的测试用例文件和mock数据文件；若没有，就生成；
 * 4. 对每个文件中的函数进行遍历，检测对应测试文件中是否已经存在测试用例；若没有，就生成；
 */
const CODE_PATH = './Example';

const codeRootPath = SF.getResolvePath(CODE_PATH);
const testRootPath = SF.getResolvePath('./Example/__test__');

const traversingCodeFile = async (currentCodePath) => {
    if (await SF.isExistDirectory(currentCodePath)) {
        // 遍历文件夹下的每个文件
        const dirFilePathList = await SF.getDirFilePathList(currentCodePath);
        dirFilePathList.forEach((filePath) => traversingCodeFile(filePath));
    } else if (await SF.isExistFile(currentCodePath)) {
        writeCodeByFile(currentCodePath);
    }
};

const writeCodeByFile = async (currentCodePath) => {

    // 尝试引入待测试的文件
    const codeFunc = await Promise.resolve(import(currentCodePath));
    if (!codeFunc) return ;

    // 生成对应的测试用例文件路径和mock数据文件路径
    const currentTestPath = SF.insertSuffixToPath(SF.combineDiffPath(currentCodePath, testRootPath), 'test');
    const currentMockPath = SF.insertSuffixToPath(SF.combineDiffPath(currentCodePath, testRootPath), 'mock');

    // *.test.js的内容
    let importFuncsCode = '';
    let importMockDataCode = '';
    let testCode = '';

    // *.mock.js的内容
    let mockDataCode = '';

    // todo: 这里生成的代码是使用的绝对路径，需要替换为相对路径
    // 针对一个函数生成测试代码和数据代码
    const setCodeContentByFunc = (afunc) => {
        importFuncsCode += GTC.getImportFuncCode(currentCodePath, afunc, currentCodePath);
        importMockDataCode += GMDC.getImportMockCode(currentMockPath, afunc);
        testCode += GTC.getTestCode(afunc);

        mockDataCode += GMDC.getMockDataCode(afunc) + GMDC.getExportMockData(afunc);
    };
    
    // 分为export default和多个export的两种情况
    if (codeFunc.default) {
        // 走default export的文件
        setCodeContentByFunc(codeFunc.default);
    } else {
        // 多个export
        for (let i in codeFunc) {
            setCodeContentByFunc(codeFunc[i]);
        }
    }

    // 写入
    SF.writeFile(currentTestPath, importFuncsCode + importMockDataCode + testCode);
    SF.writeFile(currentMockPath, mockDataCode);
};

traversingCodeFile(codeRootPath);

// (
//     async function () {
//         // const ddd = await SF.isExist(codeRootPath + '/1.txt');
//         // console.log(ddd);

//         // const codeFunc = await Promise.resolve(import(codeRootPath + '/Normal/SomeFunction.js'));
//         // for (let i in codeFunc) {
//         //     console.log(GTC.getImportFuncCode(codeRootPath, codeFunc[i], codeRootPath));
//         // }

//         // SF.writeFile(codeRootPath + '/Normal/Hello/World/index.js', '1212');

//         // console.log(SF.insertSuffixToPath('./src/format', 'test'));
//     }
// )();

