import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KCS Web班 講習会",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Web開発のすすめ1', link: '/' },
      { text: 'Web開発のすすめ2', link: '/web2.md' }
    ],

    sidebar: [
      {
        text: '講習資料',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/74rina/Web_Lecture' }
    ]
  }
})
