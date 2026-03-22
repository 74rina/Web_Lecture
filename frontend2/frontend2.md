---
marp: true
header: "フロントエンド実践"
footer: "2026 KCS Web班"
paginate: true
---

# フロントエンド実践 - ポートフォリオを作る

実際のWebサイトは、HTML, CSS, JavaScriptを直接書くだけでなく、Webフレームワークを利用して作られています。

今回は、JavaScriptフレームワークであるNext.jsと、UIを補完するReactライブラリを使って、自分だけのポートフォリオサイトを作っていきます。

---

# 目次

---

1.  **Next.js入門**

    1-1. Webフレームワークとは

    1-2. TypeScriptでの型定義

    1-3. Next.jsプロジェクトを作成する

    1-4. 中身の実装

2.  **JavaScript の文法**

3.  **読みやすいコードの書き方**

4.  **実装**

---

## 1. Next.js入門

## 1-1. Webフレームワークとは

Web開発に必要な機能が予めパッケージ化されたもの。さまざまなWebフレームワーク・ライブラリが生まれ、進化し続けている。

- フロントエンド系フレームワーク

  UIの更新、コンポーネント化、ルーティング、状態管理など。
  - Next.js（UIでReactを使用、言語はJavaScript/TypeScript）
  - Vue.js（JavaScript）

- バックエンド系フレームワーク

  DB接続、APIルーティング、セキュリティ対策（認証）など。
  - Django, Flask, FastAPI（Python）
  - Ruby on Rails（Ruby）
  - Laravel（PHP）
  - Express, NestJS（JavaScript/TypeScript）

::: tip

**フロントエンド**

ユーザから見える部分、操作性。ボタンのデザイン、アニメーション、フォームの入力チェックなど。

**バックエンド**

ユーザに見えない裏側の部分。実際の処理やデータ管理、認証など。

:::

## 1-2. TypeScriptでの型定義

Next.jsフレームワークを用いたフロントエンドの開発では、JavaScriptに**型**を追加した、**TypeScript**が使われることが多い。

::: warning
TypeScriptは、フレームワークではなく**言語**！
:::

### 「型」の重要性

**型**とは、コンピュータにデータの扱い方を教えるための、データが持つ性質のこと。整数型`int`、浮動小数点型`float`、文字列型`string`、真偽値`bool`など。

コンピュータの型付けの方法は、言語によって異なり、次の2種類に分けられる。

- **動的型付け**

  実行時に型が決まる。型を書かなくて良い。Python, JavaScriptなど。

  ```python
  x = 10
  x = "hello"
  ```

- **静的型付け**

  コンパイル時（実行前）に型が決まる。型を明示する必要があるが、コンパイル時にエラーを発見できる。TypeScript, Java, Cなど。

  ```js
  let x: number = 10;
  x = "hello"; // ←エラー
  ```

Web開発においては、次のような理由から型定義が重要である。

1. バグの早期発見

   静的型付けでは、型が壊れると**コンパイルエラー**になり、エラーの箇所を特定できるため、デバッグやリファクタリングが容易になる。

   動的型付けでは、実行時に初めて`Undefined`などのエラーが発生するため、バグの原因の特定が難しい。

2. 可読性/保守性の向上

   型を明示するため、変数や関数がどのようなデータを扱うのか明確になる（可読性↑）。これにより、他人や将来の自分がコードを理解しやすくなる（保守性↑）。

::: tip
**リファクタリング**

アプリケーションの、外部から見た動作や機能を変えずに、内部のソースコードを整理・改善する作業。
:::

## 1-3. Next.jsプロジェクトを作成する

1. Node.jsバージョン確認

   `$ node -v` で、Node.jsのバージョンが【20.11.1】以上であることを確認する。

   ::: warning
   Node.js をインストールしていない方は、[1.開発環境の構築](../environment/env.md)を参照してください。
   :::

2. `$ npm i -g create-next-app`

   を実行して、Next.jsを立ち上げるためのコマンドをインストールする。

3. ターミナルで、プロジェクトのディレクトリを置く場所に移動する。

   ::: warning

   **WindowsでWSLを使用している方**

   Windows側のディレクトリ（`/mnt/c/...`）で、4のコマンドを実行すると非常に遅くなります。

   WSLのホームディレクトリに移動して（`$ cd ~`）、適当なディレクトリを作り、次に進みましょう。

   :::

4. `$ npx create-next-app@latest <プロジェクト名>`

   を実行すると、Next.js製のアプリの雛形（Next.js + React + 設定済み環境）が作られる。

   ![install](install.png)

5. **作成したディレクトリ下**（`/portfolio`）で、`$ npm run dev` を実行し、開発用サーバを起動する。

   ![npmrundev](npmrundev.png)

6. ブラウザで、`http://localhost:3000` にアクセスし、次の画面が表示されれば完了。

   ![local](local.png)

## 1-4. 中身の実装

VSCode で、先ほど作成した`portfolio`ディレクトリを開く。

::: tip

先ほどのターミナルで、/portfolio にいる状態で、

`$ code .`

を実行すれば、一発でVSCodeに飛べる。

:::

ブラウザで`localhost:3000`にアクセスした際に描画された画面のHTMLは、`app/layout.tsx`および`app/page.tsx`内に書かれている。

![app](app.png)

→ この中身を編集していく。

---

---

## 3. 読みやすいコードの書き方

---

## 4. 実装

ポートフォリオサイトのイメージとしては、以下。

- 自己紹介ページと、作品を置くページの2画面を行き来

- サイト上部にヘッダをつける

- 自分のSNSに飛べるボタンを作る

- サイト下部にフッターをつける

---

## お疲れさまでした！

今回の成果物に対し、

- UI、Webデザインを凝ってみる

- CSSでアニメーションをつける

などの拡張を施し、ぜひ自分のポートフォリオサイトを公開してみましょう！

このような、フロントエンドだけの静的なサイトは、[GitHub Pages](https://developer.mozilla.org/ja/docs/Learn_web_development/Howto/Tools_and_setup/Using_GitHub_pages) で簡単にデプロイすることができます。

## 参考文献

MDN「Math.random()」https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random

```

```
