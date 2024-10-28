FROM node:lts-alpine

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

WORKDIR /app

COPY ./ ./

RUN npm install

ENTRYPOINT []

CMD ["tsc"]
CMD ["node app.js"]