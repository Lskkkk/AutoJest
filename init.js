import * as SFILE from './File';
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
    SFILE.writeFile('./Example/SomeFunction.test.js', importFuncsCode + importMockDataCode + testCode);
    SFILE.writeFile('./Example/SomeFunction.mock.js', mockDataCode);
})();

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
    SFILE.writeFile('./Example/DefaultFunction.test.js', importFuncsCode + importMockDataCode + testCode);
    SFILE.writeFile('./Example/DefaultFunction.mock.js', mockDataCode);
})();


/**
 * 模拟自动初始化的方法
 * 1. 读取待测文件目录；
 * 2. 遍历每个文件；
 * 3. 针对每个文件，检查对应的测试用例文件和mock数据文件；若没有，就生成；
 * 4. 对每个文件中的函数进行遍历，检测对应测试文件中是否已经存在测试用例；若没有，就生成；
 */
const CODE_PATH = './Example';

const main = async () => {
    const codeRootPath = SFILE.getResolvePath(__dirname, CODE_PATH);
    const testRootPath = SFILE.getResolvePath(__dirname, './Example/__test__');
    const mockRootPath = SFILE.getResolvePath(testRootPath, './mock');

    const traversingCodeFile = async (currentCodePath) => {
        if (!SFILE.isExist(currentCodePath)) return ;
        if (SFILE.isDirectory(currentCodePath)) {
            // 遍历文件夹下的每个文件
            const dirFilePathList = SFILE.getDirFilePathList(currentCodePath);
            dirFilePathList.forEach((filePath) => traversingCodeFile(filePath));
        } else if (SFILE.isFile(currentCodePath)) {
            // 检查对应的测试用例文件和mock数据文件
            const currentTestPath = SFILE.combineDiffPath(currentCodePath, testRootPath);
            const currentMockPath = SFILE.combineDiffPath(currentCodePath, mockRootPath);

            const codeFunc = await Promise.resolve(import(currentCodePath));
            if (!codeFunc) return ;
            
            if (codeFunc.default) {
                // 走default export的文件
                
                // test.js的内容
                const importFuncsCode = GTC.getImportFuncCode(currentCodePath, codeFunc.default, currentCodePath);
                const importMockDataCode = GMDC.getImportMockCode(currentMockPath, codeFunc.default);
                const testCode = GTC.getTestCode(codeFunc.default);

                // mock.js的内容
                const mockDataCode = GMDC.getMockDataCode(codeFunc.default) + GMDC.getExportMockData(codeFunc.default);

                // 写入
                SFILE.writeFile(currentTestPath, importFuncsCode + importMockDataCode + testCode);
                SFILE.writeFile(currentMockPath, mockDataCode);
            } else {
                // 多个export
                
                // test.js的内容
                let importFuncsCode = '';
                let importMockDataCode = '';
                let testCode = '';

                // mock.js的内容
                let mockDataCode = '';

                for (let i in codeFunc) {
                    importFuncsCode += GTC.getImportFuncCode(currentCodePath, codeFunc[i], currentCodePath);
                    importMockDataCode += GMDC.getImportMockCode(currentMockPath, codeFunc[i]);
                    testCode += GTC.getTestCode(codeFunc[i]);

                    mockDataCode += GMDC.getMockDataCode(codeFunc[i]) + GMDC.getExportMockData(codeFunc[i]);
                }

                // 写入
                SFILE.writeFile(currentTestPath, importFuncsCode + importMockDataCode + testCode);
                SFILE.writeFile(currentMockPath, mockDataCode);
            }
        }
    };

    traversingCodeFile(codeRootPath);
};
