
// load modules
http  = require('http');
https = require('https');

// parse data
var wa = JSON.parse(process.argv[2]);
// console.log(wa);

// access to web
if(wa && wa.url)
{
	var http_or_https = (wa.url.match(/^https/)) ? https : http;
	http_or_https.get(wa.url, (res)=>{
		console.log("Got response: " + res.statusCode);
	}).on('error', (e)=>{
		console.log("Got error: " + e.message);
	});
}
