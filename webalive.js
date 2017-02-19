'use strict';

// load modules
const url = require('url');
const http  = require('http');
const https = require('https');
const nodemailer = require('nodemailer');
var book = new Array();

// parse data
var wa = JSON.parse(process.argv[2]);

// access to web
if(wa && wa.url) access_url(wa.url);

// access function
function access_url(url)
{
	if(book[url]++) return 3;
	(url.match(/^https/) ? https : http).get(url, (res)=>{
		if(res.statusCode.toString().match(/^2/))
		{
			// ok notice if always "yes".
			if(wa.always == 'yes') notice_ok(wa, res);
		} else {
			if(res.headers['location'])
			{
				access_url(res.headers['location']);
			} else {
				console.error('URL('+url+') response code: '+res.statusCode.toString());
				notice_ng(wa, res);
			}
		}
	}).on('error', (e)=>{
		console.error('URL('+url+') Got error: ' + e.message);
	});
}

// ok notice
function notice_ok(wa, res){
	console.log('OK');
	if(wa.email)
	{
		send_email({
			from: wa.email,
			to: wa.email,
			subject: wa.subject || 'webalive notice [OK] '+wa.url,
			text: wa.url+"\n"+'  - response code: '+res.statusCode.toString(),
		});
	}
	if(wa.slack)
	{
		send_slack({
			webhook: wa.slack,
			text: '*webalive notice [NG]*'+"\n"+wa.url+' - response code: '+res.statusCode.toString(),
		});
	}
}

// ng notice
function notice_ng(wa, res){
	console.log('NG!');
	if(wa.email)
	{
		send_email({
			from: wa.email,
			to: wa.email,
			subject: wa.subject || 'webalive notice [NG] '+wa.url,
			text: wa.url+"\n"+'  - response code: '+res.statusCode.toString(),
		});
	}
	if(wa.slack)
	{
		send_slack({
			webhook: wa.slack,
			text: '*webalive notice [NG]*'+"\n"+wa.url+' - response code: '+res.statusCode.toString(),
		});
	}
}

// send email
function send_email(set)
{
	console.log('--- send by email ---');
	let transporter = nodemailer.createTransport({
		sendmail: true,
		newline: 'unix',
		path: '/usr/sbin/sendmail',
	});
	transporter.sendMail(set, (err, info) => {
	    console.log(info.envelope);
	    console.log(info.messageId);
	});
	console.log(set);
}

// send slack
function send_slack(set)
{
	console.log('--- send by slack ---');
	let json_data = JSON.stringify({text: set.text});
	let webhook = url.parse(set.webhook, true);
	let options = {
	    host: webhook.host,
	    path: webhook.path,
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	        'Content-Length': json_data.length
	    }
	};
	let req = (set.webhook.match(/^https/) ? https : http).request(options, (res) => {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	    console.log('BODY: ' + chunk);
	  });
	});
	req.on('error', (e) => {
	  console.log('problem with request: ' + e.message);
	});
	req.write(json_data);
	req.end();
	console.log(set);
}
