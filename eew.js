//requestを読み込む
const request = require("request");

//最終レポートを定義
var last_eew = "";

//１秒間に１回アクセス
setInterval(function () {
    //https://narikakun.ndns.xyz/v1/eew.json に GET でアクセス
    request({
        url: 'https://narikakun.ndns.xyz/v1/eew.json',
        method: 'GET'
    }, (err, response, body) => {
        try {
            if (err) {
                //エラーのときはエラーを返す
                console.error(err);
                return;
            }
            //JSONをパース
            var json = JSON.parse(body);
            //result.messageが空白でなければ返す
            if (json.result.message !== "") return;
            //最終レポートと同じであれば返す
            if (json.report_time == last_eew) return;
            //ここまで来てやっとコンソールにjsonを出す
            console.log(json);
            //最終レポートを記録
            last_eew = json.report_time;
        } catch (errs) {
            //エラーを検知したらエラーを返す
            console.error(errs);
        }
    });
}, 1000);