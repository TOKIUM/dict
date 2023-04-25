# @tokium/dict
## 概要
コード上のコメントから辞書を作成するツールです。現在Rubyのみ対応しています。
```ruby
# 入力例

# @dict-name ユーザー,従業員
# @dict-desc TOKIUMを契約した会社の従業員です。ログインすることで、TOKIUMの機能を利用することができます。
class User; end
```

現在、下記の形式のコメントから辞書を作成することができます。
- `@dict-name`
  - 辞書の名前を指定します。カンマ区切りで、最初の名前を主な名前、残りを別名として複数指定することができます。
- `@dict-desc`
  - 辞書の説明文を指定します。

## 使い方
ツールはgithub packagesに公開しています。下記のコマンドでインストールしてください。
```bash
$ npm config set @tokium:registry https://npm.pkg.github.com
$ npm login --registry=https://npm.pkg.github.com --scope=@tokium
$ npm install -g @tokium/dict
```

### generate
generateコマンドで辞書を作成できます。markdown,yaml形式であれば、下記のコマンドで辞書を標準出力できます。
notion形式もサポートされていますが、NOTION_TOKENとNOTION_PAGE_IDが環境変数に必要です。
```bash
$ dict generate <markdown or yaml> <path/to/dict/dir>
```

### check
checkコマンドで辞書が書かれているかを確認できます。
現在、Rubyのクラスに対してのみチェックできます。
```bash
$ dict check <path/to/dict/dir>
```

## 開発
### 環境構築
devcontainerを用意しています。vscodeの`Remote-Containers`拡張をインストールして、`Remote-Containers: Reopen Folder in Container`を実行すると、開発環境が構築されます。

### テスト
テストはjestで実行されます。下記のコマンドでテストを実行できます。
```bash
$ npm test
```

### リリース
リリースはgithub actionsで自動化されています。github画面内のActionsタブから、`Release`ワークフローを実行すると、リリースが行われます。
入力値として、`patch`、`minor`、`major`のいずれかを指定してください。それぞれ、パッチバージョン、マイナーバージョン、メジャーバージョンが上がります。
