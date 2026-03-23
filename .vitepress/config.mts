import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '../public/favicon.ico' }]
  ],
  title: "Web開発のすすめ",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Web開発のすすめ1', link: '/' },
      { text: 'Web開発のすすめ2', link: '/web2.md' },
      { text: 'Xアカウント', link: 'https://x.com/kcs1959' }
    ],

    sidebar: [
      {
        text: 'Web開発のすすめ1',
        items: [
          { text: '開発環境の構築', link: '/environment/env.md' },
          { text: 'フロントエンド入門', link: '/frontend1/frontend1.md' },
          { text: 'フロントエンド実践', link: '/frontend2/frontend2.md' },
          { text: 'Git/GitHub講習', link: '/api-examples' },
          { text: 'バックエンド入門1', link: '/backend1/login.md' },
          { text: 'バックエンド入門2', link: '/backend2/bulletin_board.md' },
          { text: 'Docker講習', link: '/docker/docker.md' },
          { text: 'バックエンド実践', link: '/api-examples' },
        ]
      },
      {
        text: 'Web開発のすすめ2',
        items: [
          { text: '【バックエンド】キャッシュ戦略で高速化する', link: '/environment/env.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/74rina/Web_Lecture' }
    ]
  }
})
