#!/bin/sh

/usr/local/bin/node /regist-to-cron.js | crontab -

/usr/sbin/crond -f
