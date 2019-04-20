# 時間をサバく鯖bot

指定した時間に鯖がつぶやくSlackのbotです。

## Description
スクリプト上のスケジュールに従ってSlackに投稿を行います。  
言語はGoogle Apps Scriptです。  
また、たまーに鯖がぼやきます。  
  
Google Apps Scriptのトリガーで時間指定ができないため、1分ごとに動かしスケジュールをチェックするような処理となっております。

## Usage
- 鯖に投稿させたいチームのSlackを開き、左側メニューの「Apps & integrations」を押下します。
- 「Incoming WebHooks」を検索し、新規作成でWebhook URLを取得します。
- sabaBot.gs の変数urlにWebhook URLを設定します。
- sabaBot.gs の createPayloadBase でbot名や投稿先チャンネルを設定します。
- sabaBot.gs をGoogleドライブ等に配置してください。
- 時間主導型で1分ごとに myFunction を実行するよう設定してください。
