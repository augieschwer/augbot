var HTTPS = require('https');
var ackbar = require('./ackbar.js');

var botID = process.env.BOT_ID;
var botName = process.env.BOT_NAME;

function respond() {

  var request = JSON.parse(this.req.chunks[0]);

  var pingRegex = new RegExp('^\\@?' + botName + ' ping', 'i');
  var ackbarRegex = /it[']?s a trap\b/i;

  this.res.writeHead(200);


  if(pingRegex.test(request.text)) {
      console.log('got ' + request.text );
      postMessage('PONG');
  } else if(ackbarRegex.test(request.text)) {
      console.log('got ' + request.text );
      var ackbar_url = ackbar();
      postMessage(ackbar_url);
  } else {
      console.log("don't care");
  }

  this.res.end();

}

function postMessage(msg) {

  var botResponse = msg;

  var options = {
      hostname: 'api.groupme.com',
      path: '/v3/bots/post',
      method: 'POST'
  };

  body = {
      "bot_id" : botID,
      "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
          //neat
      } else {
          console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
      console.log('error posting message '  + JSON.stringify(err));
  });

  botReq.on('timeout', function(err) {
      console.log('timeout posting message '  + JSON.stringify(err));
  });

  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
