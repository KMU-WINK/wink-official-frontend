# Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean && rm -rf ./.next/cache

COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["yarn", "start"]
