FROM node:22

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

WORKDIR /app

COPY ./ ./

RUN npm install && npm install typescript -g
RUN tsc

ENTRYPOINT ["node"]

CMD ["app.js"]