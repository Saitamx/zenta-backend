FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --production=true
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node","dist/main.js"]


