# build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma
COPY src/database/schema.prisma ./prisma/
RUN prisma generate --schema=./prisma/schema.prisma

COPY . .

RUN npm run build

# prod stage
FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 8080

CMD [ "node", "dist/main.js" ]