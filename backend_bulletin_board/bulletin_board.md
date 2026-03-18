---
marp: true
header: "バックエンド入門２"
footer: "2026 KCS Web班"
paginate: true
---

# バックエンド入門２ - 掲示板を作る

骨なしチキン

---

## バックエンドに入門しましょう！

バックエンド入門１では、ログイン処理を実装しながら、認証やセッション管理の仕組みを理解しました。

入門２では、掲示板のバックエンドを実装することで、動的なWebアプリの裏側をさらに学びます。

背景知識やPHPの文法で不明点が出てきた際は、適宜「入門１」のスライドを参照してください。

---

# 目次

1. 前提知識
   1-1. Webアプリの処理のおさらい
   1-2. DB設計
   1-3. DBアクセス
   1-3. API設計
2. SQLの文法
3. 実装
   3-1. DB設計
   3-2. APIエンドポイントの作成
   3-3. 挙動確認

---

# 1. 前提知識

---

# 1-1. Webアプリの処理のおさらい

図

---

# 1-2. DBについて

## DB（データベース）とは

データを体系的に整理して蓄積したもの。**DBモデル**とは、「データをどのような構造で保存するかの設計思想」であり、代表例は以下（年代順）。

| DBモデル          | 構造               | 使用例                                   |
| ----------------- | ------------------ | ---------------------------------------- |
| Hierarchical DB   | ツリー             | IBM Information Management System (1968) |
| Network DB        | グラフ（親が複数） | メインフレーム時代のIDMS                 |
| **Relational DB** | テーブル           | 現代のWebで利用。MySQL, PostgreSQL       |
| NoSQL             | 用途別             | キャッシュなどに利用。Redis, MongoDB     |

---

## 3層スキーマアーキテクチャ

DBは、そのモデルに拘らず、**表現・ロジック・データの保存** という階層を持つ。この3層を独立させ、DBを設計する。

図

---

## RDB（Relational DataBase）

現代のWebで用いられているDBモデル。**関係モデル**という概念を、コンピュータ上に実装したもの。

**関係モデル**（Relational Model）においては、

- データは表（テーブル）で表現される
- 行＝タプル、列＝属性
- **主キー** ＝ この値によって、どの行か一意に定まる（`id`カラムなど）

---

## 正規化

データの重複を減らしたり、不整合を防いだりするために、テーブルを分けること。
![seikika](seikika.jpeg)

主キーじゃないやつの外部化だからこれは第３正規化

---

## リレーション

1対1

1対多

多対多

---

# 1-3. API設計

## API（Application Programming Interface）

異なるプログラム間を繋ぎ、片方の機能をもう片方で呼び出す仕組み。APIの代表的な設計思想は以下。

1. **REST API**（Representational State Transfer API）
   現代のWebAPIの主流。

2. RPC（Remote Procedure Call）
   データを関数で操作する。

3. GraphQL
   クライアントが、データを直接指定する。

---

## REST API

2000年に Roy Fielding 氏が博士論文で提唱した、APIの設計思想。
6大設計原則と**リソース指向**（後述）から成る。

**RESTの6原則** ＝ REST API の前提となるWebアーキテクチャ

1. Client - Server（クライアントのリクエスト ↔︎ サーバのレスポンス）
2. Stateless（サーバは状態を保持しない）
3. Cacheable（リソースはキャッシュ可能 → サーバの負荷↓）
4. Uniform Interface（リソースへの操作方法を統一する ← CRUD操作）
5. Layered System（階層構造にする → 拡張性↑）
6. Code on Demand（クライアントがコードを実行・送信）

---

## リソース指向（Resource Oriented Design）

RESTでは、サーバを「**リソースの集合**」とみなし、それを**URL**で表現する。それに対する操作は、HTTPリクエストメソッドで表す。

- URLは全て名詞（`/users`, `/posts`, `/users/honenashi/profile`）
- URLは複数形
- レスポンスは**JSON形式**。
  ```JSON
  {
  "id": 1,
  "title": "Hello",
  "author": "Honenashi Chicken"
  }
  ```

---

## CRUD操作

APIエンドポイントを用いて、**HTTPメソッド**＋**リソース名** でDBを操作すること。

- **C**（Create）：データを**作成**する
  `POST /messages`（メッセージを投稿する）

- **R**（Read）：データを**取得**する
  `GET /users`（ユーザー一覧を取得）
  `GET /products/123`（123番の商品情報を取得）

- **U**（Update）：データを**更新**する
  `PUT /products/123`（123番の商品情報を更新）

- **D**（Delete）：データを**削除**する
  `DELETE /messages/123`（123番のメッセージを削除）

---

# 2. SQLの文法

---

# 3. 実装

---

### PHP で掲示板（会員制）のバックエンドを実装する。

1. `$ git clone https://github.com/74rina/Bulletin_Board.git`

2. アプリケーションのビルド
   `$ php -S localhost:8000`（PHPのwebサーバを起動）

（Dockerを使う場合・・・2は行わず、`$ docker compose up --build`）

3. 以降の挙動確認は後述

※ `$`はターミナル上で実行するコマンド

※ `git`や`docker`の講習は次回以降！お楽しみに！

---

# 3-1. DB設計

図

---

# 3-2. APIエンドポイントの作成

**APIエンドポイント**とは、WebAPIにおいて、クライアントがサーバ上のリソースにアクセスするための窓口となるURLのこと。今回は、

- ユーザ新規登録 `POST /register`
- ログイン `POST /login`
- ログアウト `POST /logout`
- 投稿を全件取得する `GET /posts`
- 投稿する `POST /posts`
- いいねする `POST /likes`

のエンドポイントを作成する。

---

ユーザ新規登録のエンドポイント

```php
if ($path === '/register' && $method === 'POST') {
    $data = read_json_body();
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';

    if ($username === '' || $password === '') {
        json_response(400, ['error' => 'username と password は必須です']);
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
    try {
        $stmt->execute([$username, $hash]);
        $_SESSION['user_id'] = (int)$pdo->lastInsertId();
        $_SESSION['username'] = $username;
        json_response(201, ['message' => 'registered', 'user' => ['id' => $_SESSION['user_id'], 'username' => $username]]);
    } catch (PDOException $e) {
        json_response(409, ['error' => 'username が既に存在します']);
    }
}
```

---

ログインのエンドポイント

```php
if ($path === '/login' && $method === 'POST') {
    $data = read_json_body();
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    $stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = (int)$user['id'];
        $_SESSION['username'] = $username;
        json_response(200, ['message' => 'logged_in', 'user' => ['id' => $_SESSION['user_id'], 'username' => $username]]);
    }
    json_response(401, ['error' => 'ログインに失敗しました']);
}
```

ログアウトのエンドポイント

```php
if ($path === '/logout' && $method === 'POST') {
    session_destroy();
    json_response(200, ['message' => 'logged_out']);
}
```

---

# 3-3. 挙動確認

掲示板のバックエンド実装後の挙動確認とは、**DBに対するCRUD操作**のこと。以下のような方法がある。

1. ターミナルでDBに接続し、その中でSQLクエリを書く（CLI）
2. TablePlusなどのアプリでDBに接続する（GUI）

作成したAPIエンドポイントを用いて・・・

3. ターミナルで`$curl`コマンドを打つ（CLI）
4. Postmanなどのアプリでリクエストを投げる（GUI）

---

### ターミナルでDBに接続する方法

---

### Postmanのアプリを使う

---

# 参考文献

- Zenn「【API】"RESTの原則"をアンチパターンを基に噛み砕いてみました」https://zenn.dev/kazu_u/articles/dab4e3ec7a19bd
