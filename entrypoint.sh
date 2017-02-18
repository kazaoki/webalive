#!/bin/sh

node /regist-to-cron | crontab -

postfix start

/usr/sbin/crond -f
