function doPost(req) {
    // TokenCheck
    if (req.parameter.token != "Slack Outgoing Webhooksのトークン") {
        return;
    }

    // TriggerWordの後ろに文字がある場合のみPOST
    var textArray = req.parameter.text.split(":");
    if (textArray.length > 1) {
        postSpreadSheet(textArray[1]);
        postSlack(textArray[1]);
    }
}

function postSpreadSheet(text) {
    var sheet = SpreadsheetApp.openById('Google Spread SheetのID');
    var lastRow = sheet.getLastRow();
    sheet.getRange('A' + String(lastRow + 1)).setValue(text);  
}

function postSlack(text) {
    var url = "Slack Incoming WebhooksのURL";
    var payload = {
      "text" : text
    };
    var options = {
        "method" : "POST",
        "payload" : JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);
}
