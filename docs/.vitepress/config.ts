import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getFullSidebar() {
  // 1. 定位 docs 目录（用 __dirname 确保路径正确）
  const docsPath = path.resolve(__dirname, '../')
  const sidebar = []

  // 2. 读取 docs 下的所有一级文件夹
  const folders = fs.readdirSync(docsPath, { withFileTypes: true })

  for (const item of folders) {
    // 排除 .vitepress 文件夹
    if (item.isDirectory() && item.name !== '.vitepress') {
      const folderName = item.name
      const folderPath = path.join(docsPath, folderName)
      const children = []

      // 3. 读取文件夹里的所有 .md 文件
      const files = fs.readdirSync(folderPath)
      for (const file of files) {
        if (file.endsWith('.md')) {
          let text = file.replace('.md', '')
          // ✅ 核心：把 index.md 显示成“首页”
          if (file === 'index.md') {
            text = '首页'
          }
          children.push({
            text,
            link: `/${folderName}/${file.replace('.md', '')}`
          })
        }
      }

      // 4. 把文件夹和文件添加到侧边栏，默认展开
      sidebar.push({
        text: folderName,
        items: children,
        collapsed: false
      })
    }
  }

  return sidebar
}

export default defineConfig({
  title: "我的知识库",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
    ],
    sidebar: getFullSidebar()
  }
})