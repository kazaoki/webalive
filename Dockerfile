FROM node:4.7-alpine

COPY entrypoint.sh /entrypoint.sh
COPY webalive.js /webalive.js
ENTRYPOINT ["/entrypoint.sh"]
