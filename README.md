# @tokiumjs/dict
## 概要
コード上のコメントから辞書を作成するツールです。現在Rubyのみ対応しています。
```ruby
# 入力例

# @dict-name ユーザー
# @dict-alias 従業員
# @dict-desc 会社の従業員です。
class User
  # @dict-feature-name ログイン
  # @dict-feature-desc メールアドレスとパスワードを使ってログインします。
  def login
  end
end
```

yaml形式で出力すると、下記のようになります。
```yaml
- name: ユーザー
  alias:
    - 従業員
  descriptions:
    - 会社の従業員です。
  features:
    - name: ログイン
      descriptions: 
        - メールアドレスとパスワードを使ってログインします。
```

現在、下記の形式のコメントから辞書を作成することができます。
- `@dict-name`
  - 辞書の名前を指定します。
- `@dict-alias`
  - 辞書の別名を指定します。
- `@dict-desc`
  - 辞書の名前に対して、辞書の説明文を指定します。
- `@dict-feature-name`
  - 辞書の名前に対して、機能名を指定します。
- `@dict-feature-desc`
  - 機能名に対して、説明文を指定します。

## 使い方
```bash
$ npm install @tokiumjp/dict
```

### generate
generateコマンドで辞書を作成できます。markdown,yaml形式であれば、下記のコマンドで辞書を標準出力できます。
notion形式もサポートされていますが、NOTION_TOKENとNOTION_PAGE_IDが環境変数に必要です。
```bash
$ dict generate --format <markdown or yaml or notion> --input <path/to/dict/dir> --output <path/to/output/file>
```

### check
checkコマンドで辞書が書かれているかを確認できます。
現在、Rubyのクラス・メソッドに対してのみチェックできます。
`@dict-desc`もしくは`@dict-feature-desc`が書かれていない場合、エラーが発生します。
```bash
$ dict check --type <class or method> --input <path/to/dict/dir>
```

## 開発
### 環境構築
devcontainerを用意しています。vscodeの`Remote-Containers`拡張をインストールして、`Remote-Containers: Reopen Folder in Container`を実行すると、開発環境が構築されます。
