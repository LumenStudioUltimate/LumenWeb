FROM public.ecr.aws/docker/library/node:lts-alpine

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

WORKDIR /app

COPY ./ ./

RUN npm install --only=production && npm cache clean --force && npm install typescript -g
RUN npm run build --force

ENTRYPOINT ["node"]

CMD ["app.js"]