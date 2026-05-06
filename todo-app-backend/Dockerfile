# --- ステージ1: ビルド ---
FROM node:24-slim AS builder
WORKDIR /app
# キャッシュを有効に活用するため、package系だけをコピー
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- ステージ2: 実行（本番用） ---
FROM node:24-slim
WORKDIR /app
COPY package*.json ./

RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]