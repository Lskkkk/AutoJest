# mockData.js
- 定义const
- export const

# test.js
- import function
- import const
- test code

# 工作流程
1. 获取配置中待测文件路径、测试用例输出路径、测试数据输出路径；
2. 读取待测文件，建立测试用例文件、测试数据文件；
3. 遍历文件，针对每个函数：
   - 检查有无对应测试用例生成；
   - 若无，写入测试用例、测试数据；
4. 跑测试用例；