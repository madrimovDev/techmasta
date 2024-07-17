FROM node:18-alpine3.19

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY .env.development ./.env
RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]
