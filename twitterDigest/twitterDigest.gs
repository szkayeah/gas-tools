var TWITTER_API_KEY = '{TwitterのConsumer API key}';
var TWITTER_API_SECRET = '{TwitterのConsumer API secret key}';
var TWITTER_SCREEN_NAME = '{TwitterのアカウントID}';
var BLOG_POST_ADDRESS = '{ブログ投稿用のメールアドレス}';

var DATE_FORMAT = 'yyyy-MM-dd';
var TIMEZONE = 'JST';
var TRRIGER_FUNCTION = 'digest';

function main() {
  var triggerDay = new Date();
  triggerDay.setHours(23);
  triggerDay.setMinutes(59);
  ScriptApp.newTrigger(TRRIGER_FUNCTION).timeBased().at(triggerDay).create();
}

/**
 * 設定したトリガーを削除(残るため)
 */
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i in triggers) {
    if (triggers[i].getHandlerFunction() == TRRIGER_FUNCTION) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/**
 * ツイートをまとめてブログに投稿
 */
function digest() {
  deleteTrigger();
  var today = Utilities.formatDate(new Date(), TIMEZONE, DATE_FORMAT);
  var oAuthService = getOAuthService();
  if (oAuthService.hasAccess()) {
    var tweets = getTweets(oAuthService.getAccessToken(), today);
    if (tweets.length > 0) {
      var title = '[Twitter]ツイートまとめ(' + today + ')';
      var body = createBlogBody(tweets.reverse());
      MailApp.sendEmail(BLOG_POST_ADDRESS, title, body);
    }
  } else {
    Logger.log(oAuthService.getLastError());
  }
}

/**
 * OAuthサービス作成
 */
function getOAuthService() {
  return OAuth2.createService('twitter')
    .setTokenUrl('https://api.twitter.com/oauth2/token')
    .setClientId(TWITTER_API_KEY)
    .setClientSecret(TWITTER_API_SECRET)
    .setGrantType('client_credentials')
    .setPropertyStore(PropertiesService.getUserProperties());
}

/**
 * OAuth認証状態をリセット
 */
function reset() {
  getOAuthService().reset();
}

/**
 * ツイートを取得
 * 取得APIは日付指定できないので後から除いている
 */
function getTweets(accessToken, dateStr) {
  var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=200&trim_user=1&exclude_replies=1&include_rts=1&screen_name=' + TWITTER_SCREEN_NAME;
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  var result = JSON.parse(response.getContentText());
  var tweets = new Array();
  for(var i in result){
    var created = Utilities.formatDate(new Date(result[i]['created_at']), TIMEZONE, DATE_FORMAT);
    if (created == dateStr) {
      tweets.push(result[i]);
    }
  }
  return tweets;
}

/**
 * ツイートをブログ記事用に加工
 */
function createBlogBody(tweets) {
  var html = '<ul class="digest-tweets">';
  for(var i in tweets){
    var tweet = tweets[i];
    html += '<li>';
    html += tweet['text'];
    html += ' ';
    html += '<a href="';
    html += ('https://twitter.com/' + TWITTER_SCREEN_NAME + '/statuses/' + tweet['id_str']);
    html += '" target="_new">→</a></li>';
  }
  html += '</ul>'
  return html;
}
