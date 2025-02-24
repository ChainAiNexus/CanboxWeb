const fs = require('fs');
const path = require('path');

// 正则表达式匹配中文字符
const chineseCharRegex = /[\u4e00-\u9fa5]/g;

// 遍历文件夹并删除文件内容中的中文字符
function removeChineseFromFile (filePath) {
  const content = fs.readFileSync(filePath, 'utf-8'); // 读取文件内容
  const updatedContent = content.replace(chineseCharRegex, ''); // 删除中文字符
  fs.writeFileSync(filePath, updatedContent, 'utf-8'); // 写回文件
}

// 遍历指定文件夹，删除其中所有文件内容的中文字符
function removeChineseFromFolder (folderPath) {
  fs.readdirSync(folderPath).forEach((fileName) => {
    const filePath = path.join(folderPath, fileName);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 如果是文件夹，递归调用
      removeChineseFromFolder(filePath);
    } else {
      // 如果是文件，删除内容中的中文字符
      removeChineseFromFile(filePath);
    }
  });
}

// 设置要删除中文字符的文件夹路径
const folderPath = './src'; // 请替换为目标文件夹的路径
removeChineseFromFolder(folderPath);
console.log('文件夹中的中文字符已删除！');
