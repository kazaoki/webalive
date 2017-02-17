
// load modules
var http  = require('http');
var https = require('https');
var nodemailer = require('nodemailer');
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
			process.exit(0);
		} else {
			if(res.headers['location'])
			{
				access_url(res.headers['location']);
			} else {
				console.error('URL('+url+') response code: '+res.statusCode.toString());
				notice_ng(wa, res);
				process.exit(2);
			}
		}
	}).on('error', (e)=>{
		console.error('URL('+url+') Got error: ' + e.message);
		process.exit(1);
	});
	return;
}

// ok notice
function notice_ok(wa, res){
	console.log('OK');
	if(wa.email)
	{
		// send_email({
		// 	;
		// });
	}
	if(wa.slack)
	{
		// send_slack({
		// 	;
		// });
	}
}

// ng notice
function notice_ng(wa, res){
	console.log('NG!');
	if(wa.email)
	{
		send_email({
			from : 'admin',
			to   : wa.email,
			subject : wa.subject || 'webalive notice [NG] '+wa.url,
			text :  'URL('+wa.url+') response code: '+res.statusCode.toString()
		});
	}
	if(wa.slack)
	{
		// send_slack({
		// 	;
		// });
	}
}

// send email
function send_email(set)
{
	var transporter = nodemailer.createTransport({
		sendmail: true,
		newline: 'unix',
		path: '/usr/sbin/sendmail'
	});
	transporter.sendMail(set);
	console.log('  sent email.');
}

// send slack
function send_slack(set)
{
	console.log('  sent slack.');
}
