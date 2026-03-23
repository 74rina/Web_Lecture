---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
pageClass: bg-home-2

hero:
  name: "Web開発のすすめ1"
  text: "Keio Computer Society"
  tagline: 2026年度 Web班 骨なしチキン
  actions:
    - theme: brand
      text: 【入門】Web開発のすすめ1
      link: /
    - theme: brand
      text: 【発展】Web開発のすすめ2
      link: /web2.md
    - theme: alt
      text: X公式アカウント↗︎
      link: https://x.com/kcs1959

features:
  - title: 1. 開発環境の構築
    details: WSLやVisual Studio Codeなどの開発環境の構築、CLIの操作に入門します。
    link: /environment/env.md
  - title: 2. フロントエンド入門
    details: HTML, CSS, JavaScriptの書き方を学び、「おみくじ」を作ります。
    link: /frontend1/frontend1.md
  - title: 3. フロントエンド実践
    details: Next.jsフレームワークとReactライブラリを使って、自分のポートフォリオサイトを作ります。
    link: /frontend2/frontend2.md
  - title: 4. Git/GitHub講習
    details: チーム開発では欠かせない、Git/GitHubの仕組み・使い方を学びます。
  - title: 5. バックエンド入門１
    details: PHPで簡易的なログイン処理を実装しながら、クライアントサーバシステム、サーバの認証の仕組みを学びます。
    link: /backend1/login.md
  - title: 6. バックエンド入門２
    details: PHPで掲示板を作りながら、DB設計、API設計を学びます。
    link: /backend2/bulletin_board.md
  - title: 7. Docker講習
    details: Web開発においては、仮想化技術Dockerを使用することが多いです。
    link: /docker/docker.md
  - title: 8. バックエンド実践
    details: FastAPIのWebフレームワーク（Python）を使って、より本格的な掲示板を作ります。
---
