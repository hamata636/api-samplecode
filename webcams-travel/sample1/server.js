const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("listening on port " + 3000);
});


//JavaScriptからのGET通信を処理する
app.get("/data", function(request, response) {
  getCameraData()
  .then(data => response.send(data));
});


//webcams.travelからライブカメラの情報を取得する
//x-rapidapi-keyはご自身のキーを設定してください
//下記の例は最大で20個分のカメラ情報を取得します
function getCameraData() {
  const options = {
    method: 'GET',
    url: 'https://webcamstravel.p.rapidapi.com/webcams/list/country=JP/limit=20',
    qs: {lang: 'en', show: 'webcams:image'},
    headers: {
      'x-rapidapi-host': 'webcamstravel.p.rapidapi.com',
      'x-rapidapi-key': 'e81d3e77de7b44d79b2117826855227d'
    }
  };

  return new Promise((resolve) => {
    request(options, function (error, response, body) {
      const json = JSON.parse(body);

      resolve(json.result.webcams);
    });
  })
}


