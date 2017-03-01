FROM node:7.5-alpine

RUN apk --update add postfix \
    && rm -fr /var/cache/apk/*

COPY package.json /package.json
COPY webalive.js /webalive.js
COPY regist-to-cron.js /regist-to-cron.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN npm install

ENTRYPOINT ["/entrypoint.sh"]
