var yaml = require('js-yaml');
var fs = require('fs');

try {
  var list = yaml.safeLoad(fs.readFileSync('/etc/webalive.yml', 'utf8'));
  list.forEach(function(web){
    var timing = web.timing;
    delete web.timing;
    var json_string = JSON.stringify(web);
    console.log('%s /usr/local/bin/node /webalive.js "%s"', timing, json_string.replace(/\"/g,'\\"'));
  });
} catch (e) {
  console.error(e);
}