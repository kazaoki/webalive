#!/bin/sh

/usr/sbin/crond

node /webalive.js

while true
do
    sleep 60
done
