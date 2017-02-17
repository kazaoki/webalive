
// Initialize
var yaml      = require('js-yaml');
var fs        = require('fs');
var yaml_file = '/etc/webalive.yml';
var wa        = new Object();

// load yaml file if exist.
if(fs.existsSync(yaml_file))
{
	try {
		list = yaml.safeLoad(fs.readFileSync(yaml_file, 'utf8'));
		list.forEach(function(item)
		{
			if(item.url)
			{
				wa[item.url] = item;
			}
		});
	} catch (e) {
		console.error(e);
	}
}

// overwrite if exist envs.
console.log(wa);


// // output by format of cron.
// wa.forEach(function(item){
// 	var timing = item.timing;
// 	delete item.timing;
// 	var json_string = JSON.stringify(item);
// 	console.log('%s /usr/local/bin/node /webalive.js "%s"', timing, json_string.replace(/\"/g,'\\"'));
// });
