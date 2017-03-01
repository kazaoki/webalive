
// Initialize
const yaml    = require('js-yaml');
const fs      = require('fs');
let yaml_file = '/etc/webalive.yml';
let wa        = {};

// load yaml file if exist.
if(fs.existsSync(yaml_file))
{
	try {
		list = yaml.safeLoad(fs.readFileSync(yaml_file, 'utf8'));
		list.forEach((item)=>
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

// set from env
let keys = Object.keys(process.env).sort();
keys.forEach((key)=>{
    let match = key.match(/^WA(\d+)_URL$/);
    if(match && match[1]){
        let set = new Object();
        keys.forEach((in_key)=>{
                let in_match = in_key.match(new RegExp('^WA'+match[1]+'_(.+)$'));
                if(in_match && in_match[1])
                {
                        set[in_match[1].toLowerCase()] = process.env[in_key];
                }
        });
        wa[process.env[key]] = set;
    }
});

// output by format of cron.
Object.keys(wa).forEach((key)=>
{
	let item = wa[key];
	let timing = item.timing;
	delete item.timing;
	let json_string = JSON.stringify(item);
	console.log('%s node /webalive "%s"', timing, json_string.replace(/\"/g,'\\"'));
});
