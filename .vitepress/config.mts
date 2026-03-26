import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Web_Lecture/',
  head: [
    ['link', { rel: 'icon', href: '../public/favicon.ico' }]
  ],
  title: "Web開発のすすめ",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Web開発のすすめ1', link: '/' },
      { text: 'Web開発のすすめ2', link: '/web2' },
      { text: 'X公式アカウント', link: 'https://x.com/kcs1959' }
    ],

    sidebar: [
      {
        text: 'Web開発のすすめ1',
        items: [
          { text: '1. 開発環境の構築', link: '/environment/env' },
          { text: '2. フロントエンド入門', link: '/frontend1/frontend1' },
          { text: '3. フロントエンド実践', link: '/frontend2/frontend2' },
          { text: '4. Git/GitHub講習', link: '/comingsoon/comingsoon' },
          { text: '5. バックエンド入門1', link: '/backend1/backend1' },
          { text: '6. バックエンド入門2', link: '/backend2/backend2' },
          { text: '7. Docker講習', link: '/docker/docker' },
          { text: '8. バックエンド実践', link: '/backend3/backend3'  },
        ]
      },
      {
        text: 'Web開発のすすめ2',
        items: [
          { text: '【バックエンド】キャッシュで高速化する', link: '/comingsoon/comingsoon' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/74rina/Web_Lecture' }
    ],

    docFooter: {
      prev: false,
      next: false
    }
  }
})
