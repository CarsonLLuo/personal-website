const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 检查图片是否存在
const inputPath = path.join(__dirname, 'public/images/monet-sunrise.jpg');
const outputPath = path.join(__dirname, 'public/images/monet-sunrise.webp');

// 确保输出目录存在
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

if (fs.existsSync(inputPath)) {
  // 转换图片为WebP，质量设置为75%（可根据需求调整）
  sharp(inputPath)
    .webp({ quality: 75 })
    .toFile(outputPath)
    .then(() => {
      console.log('图片已成功转换为WebP格式并保存到:', outputPath);
      
      // 获取文件大小信息
      const originalSize = fs.statSync(inputPath).size / (1024 * 1024);
      const optimizedSize = fs.statSync(outputPath).size / (1024 * 1024);
      
      console.log(`原始大小: ${originalSize.toFixed(2)}MB`);
      console.log(`优化后大小: ${optimizedSize.toFixed(2)}MB`);
      console.log(`减少了: ${((originalSize - optimizedSize) / originalSize * 100).toFixed(2)}%`);
    })
    .catch(err => {
      console.error('转换图片时出错:', err);
    });
} else {
  console.error('找不到源图片:', inputPath);
} 