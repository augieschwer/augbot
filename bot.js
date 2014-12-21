var HTTPS = require('https');
var ackbar = require('./ackbar.js');

var botID = process.env.BOT_ID;
var botName = process.env.BOT_NAME;

function respond() {

  var request = JSON.parse(this.req.chunks[0]);

  var pingRegex = new RegExp('^\\@?' + botName + ' ping', 'i');
  var ackbarRegex = /it[']?s a trap\b/i;

  this.res.writeHead(200);

  console.log('got ' + request.text );

  if(pingRegex.test(request.text)) {
	  postMessage('PONG');
  } else if(ackbarRegex.test(request.text)) {
	  var ackbar_url = ackbar();
	  postMessage(ackbar_url);
  }

  this.res.end();

}

function postMessage(msg) {

  var botResponse = msg;

  console.log('sent ' + botResponse);

}

exports.respond = respond;
