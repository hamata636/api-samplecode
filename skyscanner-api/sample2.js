const express = require("express");
const app = express();
const request = require("request");
const endpoint = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/';


//リクエストのbody解析用
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//3000番ポートでサーバーを起動する
app.listen(3000);


//Slackからのコマンドを受け取る
app.post('/command', (req, res) => {
  const input = req.body.text.split(',');
  
  getMinPrice(input[0], input[1], input[2])
  .then(data => {
    const message = {
      response_type: 'in_channel',
      text: `最安値は${data.Quotes[0].MinPrice}円です！航空会社は${data.Carriers[0].Name}です`
    }
    res.json(message);
  })
  .catch(error => res.json('もう一度入力してください'));
})




//飛行機の最安値を取得する
function getMinPrice(startPlace, endPlace, startDate) {
  const options = {
    method: 'GET',
    url: `${endpoint}JP/JPY/ja-JP/${startPlace}/${endPlace}/${startDate}`,
    json: true,
    headers: {
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      'x-rapidapi-key': '********************************************'
    }
  }
  
  return new Promise(resolve => {
    request(options, (error, response, body) => resolve(body));
  })
}
