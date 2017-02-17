FROM node:7.5-alpine

COPY node_modules /node_modules/
COPY webalive.js /webalive.js
COPY regist-to-cron.js /regist-to-cron.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
