'use strict';

var https = require('https');
var util = require('util');

exports.handler = function (event, context) {
	console.log(JSON.stringify(event, null, 2));

	var postData = {
		channel: '#automation',
		username: 'AWS Billing SNS via Lamda',
		text: '*' + event.Records[0].Sns.Subject + '*',
		icon_emoji: ':aws:'
	};

	var message = event.Records[0].Sns.Message;
	var color = 'danger';

	postData.attachments = [
		{
			color: color,
			text: message
		}
	];

	var options = {
		method: 'POST',
		hostname: 'hooks.slack.com',
		port: 443,
		path: '/services/your-slack-webhook-url-info-goes-here'
	};

	var req = https.request(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			context.done(null);
		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	req.write(util.format('%j', postData));
	req.end();
};
