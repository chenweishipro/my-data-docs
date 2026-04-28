import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// ==============================================
//  ✅ 自动扫描 docs 下 所有一级文件夹
//  ✅ 新增文件夹 → 自动显示在侧边栏
//  ✅ 永远显示全部，不切换、不隐藏
// ==============================================
function getFullSidebar() {
  const docsPath = path.resolve(__dirname, '../../docs')
  const folders = fs.readdirSync(docsPath, { withFileTypes: true })
  const sidebar = []

  for (const item of folders) {
    if (item.isDirectory() && item.name !== '.vitepress') {
      const folderName = item.name
      const folderPath = path.join(docsPath, folderName)
      const files = fs.readdirSync(folderPath)
      const children = []

      for (const file of files) {
        if (file.endsWith('.md')) {
          children.push({
            text: file.replace('.md', ''),
            link: `/${folderName}/${file}`
          })
        }
      }

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
    sidebar: getFullSidebar() // ✅ 自动生成全部
  }
})