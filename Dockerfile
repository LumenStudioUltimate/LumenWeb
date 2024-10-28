FROM public.ecr.aws/docker/library/node:lts-alpine

RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

WORKDIR /app

COPY ./ ./

RUN npm install
RUN npm run build

ENTRYPOINT ["node"]

CMD ["app.js"]