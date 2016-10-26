function myFunction() {
  // 現在時間の取得
  var now = Utilities.formatDate(new Date(), "JST", "HH:mm");
  
  // スケジュールの取得
  var scheduleArray = getSchedule();
  
  // スケジュールのチェック
  for (var i = 0; i < scheduleArray.length; i++) {
    var schedule =  scheduleArray[i];
    
    if (schedule["time"] !== now) {
      // 時間が一致しない場合
      continue;
    }
    
    // 投稿
    var payload = createPayloadBase(schedule["text"]);
    postSlack(payload);
  }
  
  // おたのしみ
  var random = Math.floor(Math.random() * 100);
  if (random == 0) {
    var tweetArray = getTweet();
    var tweet = tweetArray[Math.floor(Math.random() * tweetArray.length)];
    var payload = createPayloadBase(tweet);
    postSlack(payload);
  }
}

function createPayloadBase(text) {
  var payload = {
    "username" : "時間をサバく鯖bot",
    "icon_emoji": "", // アイコン画像はslack側の設定を使用
    "channel" : "#saba",
    "text" : text
  };

  return payload;
}

function postSlack(payload) {
  // POST先
  var url = "POST先URLを設定してください";

  // POSTオプション
  var options = {
    "method" : "POST",
    "payload" : JSON.stringify(payload)
  };

  // POST
  var response = UrlFetchApp.fetch(url, options);
  var content = response.getContentText("UTF-8");
}

function getSchedule() {
  var scheduleArray = new Array();

  schedule = {
    "time" : "09:30",
    "text" : "朝会の時間ですよ！"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "10:00",
    "text" : "集中時間 開始"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "11:30",
    "text" : "集中時間 終了"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "12:00",
    "text" : "おひるやすみ！！！"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "13:00",
    "text" : "集中時間 開始"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "14:30",
    "text" : "集中時間 終了"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "15:00",
    "text" : "集中時間 開始"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "16:30",
    "text" : "集中時間 終了"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "17:00",
    "text" : "集中時間 開始"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "18:00",
    "text" : "残業申請忘れずに。"
  };
  scheduleArray.push(schedule);
  
  schedule = {
    "time" : "18:30",
    "text" : "集中時間 終了"
  };
  scheduleArray.push(schedule);

  schedule = {
    "time" : "18:30",
    "text" : "＼( 'ω' )三＼( 'ω')／定時ーーッ！！"
  };
  scheduleArray.push(schedule);

  return scheduleArray;
}

function getTweet() {
  var tweetArray = new Array();

  tweetArray.push("サバァ…");
  tweetArray.push("安心してください。サバですよ。");
  tweetArray.push("死んだサバの目みたいになっていますよ。少し休憩しませんか？");
  tweetArray.push("ご飯に悩んでいるなら焼きサバなんてどうでしょうか。");
  tweetArray.push("サバ、もうつかれた…");
  tweetArray.push("サバだけにサバサバしている。");
  
  return tweetArray;
}
