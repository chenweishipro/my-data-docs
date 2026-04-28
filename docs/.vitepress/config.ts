import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getFullSidebar() {
  const docsPath = path.resolve(__dirname, '../')
  const sidebar = []

  const folders = fs.readdirSync(docsPath, { withFileTypes: true })

  for (const item of folders) {
    if (item.isDirectory() && item.name !== '.vitepress') {
      const folderName = item.name
      const folderPath = path.join(docsPath, folderName)
      const children = []

      const files = fs.readdirSync(folderPath)
      for (const file of files) {
        if (file.endsWith('.md')) {
          let text = file.replace('.md', '')
          if (file === 'index.md') {
            text = '首页'
          }
          children.push({
            text,
            link: `/${folderName}/${file.replace('.md', '')}`
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
  base: '/my-data-docs/',
  title: "我的知识库",
  ignoreDeadLinks: true,
  // 👇 关键：让配置在构建时在 Node 环境运行
  vite: {
    build: {
      ssr: true
    }
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
    ],
    sidebar: getFullSidebar()
  }
})