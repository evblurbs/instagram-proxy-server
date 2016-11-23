var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Twitter = require('twitter-node-client').Twitter;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/test', function(req, res) {

  var config = {
      "consumerKey": "ymDH2WFcPmX5X9uiMaLn7CQwf",
      "consumerSecret": "zxH2EKu30j2kgrdxy7lDtzYegg1DlnVGAyd2uT8FEmvONu8x7W",
      "accessToken": "24570002-Z56HTomi5By91i5Ht83XuqcojSbM1Bj7Q0th9hSNR",
      "accessTokenSecret": "ey1ZtIf8aIxkAsntvz6qvtvyqbgCdBLOEhrrBIjfRHWJy",
      "callBackUrl": "https://instagram-proxy-server.herokuapp.com/callback"
  };

  var twitter = new Twitter(config);
  twitter.getSearch({'q':'puppy filter:images','count': 10}, function(err, response, body) {
    console.log('ERROR [%s]', err);
    res.json({ error: err });
  }, function(data) {
    console.log('Data [%s]', data);
    res.json({ message: JSON.parse(data) });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});