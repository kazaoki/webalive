
// load modules
var http  = require('http');
var https = require('https');
var book = new Array();

// parse data
var wa = JSON.parse(process.argv[2]);
// console.log(wa);

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
			notice_ok(wa);
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
function notice_ok(){
	console.log('OK');
}

// ng notice
function notice_ng(){
	console.log('NG!');
}
