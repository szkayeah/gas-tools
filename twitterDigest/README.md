# twitterDigest

1日ぶんのツイートをまとめて、1日1回指定メールアドレスに送信します。  
投稿用メールアドレスのあるブログサービスで、自動でツイートのまとめを記事にできます。

## Description

GASはUI上ではトリガーの時間指定はできませんが、スクリプトからトリガーを作成することで毎日23:59実行にしています。  
OAuth2認証を使用し、Twitterからツイートを取得、HTMLのリストに整形します。  
整形したHTMLを本文にしてメールを送信します。

本スクリプトは、はてなブログ用に作成されています。  
記事タイトル「ツイートまとめ(yyyy-MM-dd)」の「Twitterカテゴリ」で記事が投稿されます。

## Usage
- twitterDigest.gs をGoogleドライブ等に配置してください。
- [OAuth2のライブラリ](https://github.com/gsuitedevs/apps-script-oauth2)を追加してください。
- twitterDigest.gs の以下の定数を書き換えてください。

| 定数名              | 内容                             |
|---------------------|----------------------------------|
| TWITTER_API_KEY     | TwitterのConsumer API key        |
| TWITTER_API_SECRET  | TwitterのConsumer API secret key |
| TWITTER_SCREEN_NAME | TwitterのアカウントID            |
| BLOG_POST_ADDRESS   | ブログ投稿用のメールアドレス     |

- 時間主導型で日付ベースのトリガーを設定してください。
- 毎日23:59にトリガーを作成し、処理が動くようになります。
