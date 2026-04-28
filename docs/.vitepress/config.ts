import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/my-data-docs/',
  title: "我的知识库",
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
    ],
    sidebar: [
      {
        text: "工作文档",
        items: [
          { text: "首页", link: "/工作文档/index" },
          { text: "活动看板", link: "/工作文档/活动看板" },
        ],
        collapsed: false
      },
      {
        text: "数学",
        items: [{ text: "首页", link: "/数学/index" }],
        collapsed: false
      },
      {
        text: "数据分析",
        items: [{ text: "首页", link: "/数据分析/index" }],
        collapsed: false
      },
      {
        text: "数据科学",
        items: [{ text: "首页", link: "/数据科学/index" }],
        collapsed: false
      },
      {
        text: "精益创业",
        items: [{ text: "首页", link: "/精益创业/index" }],
        collapsed: false
      },
    ]
  }
})