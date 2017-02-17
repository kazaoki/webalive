
// load modules
var http  = require('http');
var https = require('https');
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
			if(wa.always == 'yes') notice_ok(wa);
			process.exit(0);
		} else {
			if(res.headers['location'])
			{
				access_url(res.headers['location']);
			} else {
				console.error('URL('+url+') response code: '+res.statusCode.toString());
				notice_ng(wa);
				process.exit(2);
			}
		}
	}).on('error', (e)=>{
		console.error('URL('+url+') Got error: ' + e.message);
		notice_ng(wa);
		process.exit(1);
	});
	return;
}

// ok notice
function notice_ok(wa){
	console.log('OK');
	if(wa.email)
	{
		send_email({
			;
		});
	}
	if(wa.slack)
	{
		send_slack({
			;
		});
	}
}

// ng notice
function notice_ng(wa){
	console.log('NG!');
	if(wa.email)
	{
		send_email({
			;
		});
	}
	if(wa.slack)
	{
		send_slack({
			;
		});
	}
}

// send email
function send_email(set)
{
	console.log('  send to email.');
	;
}

// send slack
function send_slack(set)
{
	console.log('  send to slack.');
}
