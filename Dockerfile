FROM node:20-alpine AS builder

WORKDIR /app

COPY .next/standalone/package.json ./package.json

RUN npm install -g pnpm && \
    pnpm install --prod --ignore-scripts && \
    pnpm store prune && \
    npm uninstall -g pnpm && \
    npm cache clean --force && \
    rm -rf /root/.pnpm-store /var/cache/apk/*

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY .next/standalone ./

EXPOSE 3000

CMD ["node", "server.js"]
