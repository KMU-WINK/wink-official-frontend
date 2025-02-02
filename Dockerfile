FROM node:20-alpine

WORKDIR /app

COPY .next/standalone ./

RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install --prod --ignore-scripts && \
    pnpm store prune && \
    rm -rf /root/.pnpm-store /root/.cache /app/.next/cache

EXPOSE 3000

CMD ["node", "server.js"]
