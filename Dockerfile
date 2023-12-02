# Frontend Dockerfile
FROM node:20-alpine3.17 AS frontend-build

WORKDIR /app/Frontend
COPY Frontend .
RUN npm install
RUN npm run build:prod

# Backend Dockerfile
FROM node:20-alpine3.17 AS backend-build
WORKDIR /app/Backend
COPY Backend .
RUN npm install
RUN npm run build

# Create a new image for the backend and include the frontend build
FROM node:20-alpine3.17
WORKDIR /app
COPY --from=frontend-build /app/Frontend/build /app/public
COPY --from=backend-build /app/Backend .

# Move to the backend directory
WORKDIR /app/Backend

# Install backend dependencies
RUN npm install

# Expose the port that your Node.js app is running on
EXPOSE 8080

# Start your Node.js app
CMD ["npm", "start"]
