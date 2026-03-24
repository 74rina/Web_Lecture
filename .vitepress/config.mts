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
      { text: 'X公式アカウント', link: 'https://x.com/kcs1959' }
    ],

    sidebar: [
      {
        text: 'Web開発のすすめ1',
        items: [
          { text: '1. 開発環境の構築', link: '/environment/env.md' },
          { text: '2. フロントエンド入門', link: '/frontend1/frontend1.md' },
          { text: '3. フロントエンド実践', link: '/frontend2/frontend2.md' },
          { text: '4. Git/GitHub講習', link: '/git/git.md' },
          { text: '5. バックエンド入門1', link: '/backend1/backend1.md' },
          { text: '6. バックエンド入門2', link: '/backend2/backend2.md' },
          { text: '7. Docker講習', link: '/docker/docker.md' },
          { text: '8. バックエンド実践', link: '/backend3/backend3.md'  },
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
