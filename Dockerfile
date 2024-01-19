FROM node:18 as client

WORKDIR /usr/src/client

COPY ./client .
RUN npm ci
RUN npm run build

FROM node:18 as server

WORKDIR /usr/src/server

COPY ./server .
RUN npm ci
RUN npm run build

COPY --from=client /usr/src/client/dist /usr/src/server/dist/public

RUN rm -rf /usr/src/client

EXPOSE 8080

CMD [ "npm", "start" ]