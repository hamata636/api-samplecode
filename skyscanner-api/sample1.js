const request = require("request");
const endpoint = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/';


//飛行機の最安値を調べる
//[x-rapidapi-key]は自身が持つ固有のキーを入力してください
function getMinPrice(startPlace, endPlace, startDate) {
  const options = {
    method: 'GET',
    url: `${endpoint}JP/JPY/ja-JP/${startPlace}/${endPlace}/${startDate}`,
    json: true,
    headers: {
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      'x-rapidapi-key': 'e81d3e77de7b44d79b2117826855227d'
    }
  }
  
  return new Promise(resolve => {
    request(options, (error, response, body) => resolve(body));
  })
}


//取得した結果のQuotes内に料金情報が格納されている
getMinPrice('NRT-sky', 'CTS-sky', '2019-12-01')
.then(data => {
  console.log(data.Quotes);
});
