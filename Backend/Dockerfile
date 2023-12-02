# Backend Dockerfile
FROM node:20-alpine3.17 AS backend-build

WORKDIR /app/Backend
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build
