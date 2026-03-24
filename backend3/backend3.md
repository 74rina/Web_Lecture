---
marp: true
header: "バックエンド実践"
footer: "2026 KCS Web班"
paginate: true
---

# バックエンド実践 - 掲示板を作る

Webブラウザ上で動作する HTML, CSS, JavaScript は、Webサイトの技術の基本です。

今回は、簡単なおみくじアプリを作りながら、書き方の基本を学びます。

詳しい文法は、[MDN(MDN Web Docs)](https://developer.mozilla.org/ja/) を適宜参照してください。

---

# 目次

---

1.  **システムの設計**

    1-1. ソフトウェア開発ライフサイクル

    1-2. 技術選定

    1-3. プロジェクトの環境構築

2.  **バックエンドの実装**

    2-1. CORS設定

    2-2. MVCモデル

    2-3. ドメイン駆動開発

    2-4. DB設計

    2-5. API設計

3.  **フロントエンドの実装**

---

## 1. システムの設計

## 1-1. ソフトウェア開発ライフサイクル

システムを開発するための一連の流れ。**SDLC**（Software Development Life Cycle）と呼ぶ。

1. **要件定義**
2. **設計**
3. **実装**
4. **テスト**
5. **リリース**
6. **運用・保守**

また、この流れを回す方法として、次の2種類がある。

1. **ウォーターフォール開発**

   「要件 → 設計 → 実装 → テスト → リリース」のフローにおいて、前に戻らない。途中で仕様を変えたくなる場合に弱い。要件が固い、大規模システムの開発で用いる。

2. **アジャイル開発**

   このフローを、短い単位（1〜2週間）で何度も回す。計画がブレやすいが、途中の仕様変更に強い。

実際のWeb開発では、最初にざっくり設計し、以降はアジャイルで回すことが多い。

また、本記事では「設計・実装・テスト」の部分に焦点を当て、掲示板を作っていく。

## 1-2. 技術選定

使用するフレームワーク・DBは次の通り。

- フロントエンド：React/Vite（JavaScript, TypeScript）
- バックエンド：FastAPI（Python）
- データベース：PostgreSQL
- Dockerコンテナを3個立てる（frontend, backend, db）

### 選定の理由

- バックエンドでPythonを勉強したかった（？）

- UIはReactでちゃんと作りたいけど、APIの設計にはFastAPIを使うので、フロントエンドにNext.jsほどのフルスタックな機能（APIルート、SSRなど）はいらない。

- 「フロントはUI、バックはAPI」という責務の分離が分かりやすい。

- SQLiteはDBサーバを持たず（＝ dbコンテナも不要）、1ファイルなので楽。しかし、
  1. 今後バックエンドのコンテナを増やして、複数コンテナからDBを操作するとなったときに向かない。

  2. SQLiteでは、宣言した型と異なるデータも格納できてしまう。

  という拡張性・安全性の観点から、より安全で同時アクセスにも強いPostgreSQLを選択。

## 1-3. プロジェクトの環境構築

### ディレクトリの作成

プロジェクトのディレクトリ構成は、次のようになる。

```
bulletin_board_2/
├── frontend/
├── backend/
├── db/
│
├── docker-compose.yml
├── .env
├── .gitignore
└── README.md
```

まず、プロジェクトのディレクトリを新規作成し、そこに移動しておく。

```
$ mkdir bulletin_board_2

$ cd bulletin_board_2
```

### Git/GitHubの設定

プロジェクトのルートで、以下を実行し、Gitを初期化する。

```
$ git init
```

また、GitHub上でリポジトリを新規作成する。

![repo](repository.png)

その後、ローカルで

```
$ git remote add origin https://github.com/74rina/bulletin_board_2.git

$ git add .

$ git commit -m "initial_commit"

$ git push origin main
```

を実行し、ローカルとリモートリポジトリを紐づける。

### フロントエンド（Vite + React）の環境構築

1.  Vite製プロジェクトの作成（frontendディレクトリを作る）

    ```
    $ npm create vite@latest frontend
    ```

    - Select a framework: `React`
    - Select a variant: `TypeScript`
    - Install with npm and start now?: `Yes`

    を選択。

2.  frontendディレクトリに移動

    ```
    $ cd frontend
    ```

3.  依存関係のインストール・開発用サーバの起動

    ```
    $ npm install

    $ npm run dev
    ```

4.  ブラウザで以下の画面が表示されたら成功。

    ![vite](vite.png)

### バックエンド（FastAPI）の環境構築

必要であれば、ローカルでPythonを使えるようにしてください。

> 1. ターミナルで、
>
> （WSL）`$ sudo apt install python3`
>
> （Mac）`$ brew install python3`
>
> 2. 拡張機能 > `Python` をインストール

1. プロジェクトのルートで、backendディレクトリを作る

   ```
   $ cd ..

   $ mkdir backend

   $ cd backend
   ```

2. **Python の仮想環境の作成**

   ::: tip
   **Pythonの仮想環境（venv）**

   プロジェクトごとに、独立したPython実行環境を作成する仕組み。

   仮想環境を作成する（`python -m venv venv`）ことで、各プロジェクト内に`venv`ディレクトリが作られ、その中に、専用のPython実行環境＋ライブラリのインストール先が用意される。

   その後、仮想環境を有効化する（`source venv/bin/activate`）ことで、その環境内のPythonやライブラリが使用されるようになる。

   構築の流れは毎回同じなので、覚えてしまいましょう！
   :::

   backend/ で以下を実行し、仮想環境を作成する。

   ```
   $ python3 -m venv venv

   $ source venv/bin/activate
   ```

3. FastAPI・Uvicorn（Webサーバ）のインストール

   ```
   $ pip install fastapi uvicorn[standard]
   ```

4. アプリケーション用ディレクトリとファイルの作成

   ```
   $ mkdir app

   $ touch app/main.py

   $ touch requirements.txt
   ```

5. ` app/main.py` に FastAPI の最小構成コードを書く

   ```python
   from fastapi import FastAPI

   app = FastAPI()

   @app.get("/")
   def read_root():
       return {"message": "Hello FastAPI"}
   ```

6. インストールした依存関係を `requirements.txt` に保存

   ```
   $ pip freeze > requirements.txt
   ```

   ::: tip
   **requirements.txt**

   このプロジェクトで使うPythonライブラリ一覧（の名前＋バージョン情報）。

   これを他者がクローンし、

   ```
   pip install -r requirements.txt
   ```

   を実行することで、同じPython環境を再現できる。

   npmとの比較は以下。

   | JavaScript        | Python                  |
   | ----------------- | ----------------------- |
   | package.json      | requirements.txt        |
   | npm install       | pip install             |
   | node_modules      | venv                    |
   | package-lock.json | （ほぼ無い / 別ツール） |

   :::

7. 開発用サーバの起動

   ```
   $ uvicorn app.main:app --reload --port 8000
   ```

8. ブラウザで `http://localhost:8000` にアクセスし、以下の画面が表示されれば成功。

   ![fa](fastapi.png)

---

## 2. バックエンドの実装

## 2-1. CORS設定

**CORS**（Cross-Origin Resource Sharing）とは、同一オリジンポリシー（JSは、同じオリジンのデータしか読めない）を緩和したもの。

HTTPリクエストに次のようなヘッダを含めることで、異なるドメイン（オリジン）間で、安全なデータ通信ができる。

```
Access-Control-Allow-Origin: 許可するオリジン（ドメイン）
Access-Control-Allow-Methods: 許可するHTTPメソッド（GET, POST, PUTなど）
```

::: warning
`Access-Control-Allow-Origin: * `

では全オリジンを許可しているので、第三者からの不正アクセスに注意。
:::

::: tip

- **ホワイトリスト**：許可したものだけ通す（CORS, 認証など）

- **ブラックリスト**：禁止したものだけ弾く（ユーザ入力など）

:::

今回は、`backend/app/main.py`内に、次のようなCORS設定を追加する。

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello FastAPI"}
```

## 2-2.

---

## お疲れさまでした！

【入門】Web開発のすすめ1 を最後までお読みいただき、ありがとうございました！

Web開発におけるフロントエンド・バックエンドの基礎知識や、チーム開発の基本ルールを一通り学ぶことができました。

【発展】Web開発のすすめ2 では、フロントエンド・バックエンド・インフラそれぞれについて、より実践的かつ応用的な技術をまとめていく予定です。

引き続き、一緒に学んでいきましょう！(ﾟ∀ﾟ≡ﾟ∀ﾟ)

## 参考文献

- MDN「Math.random()」

  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
