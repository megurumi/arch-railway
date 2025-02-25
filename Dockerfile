# Stage 1: Build the frontend application
FROM node:18 AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

RUN npm run build

# Stage 2: Build the backend application
FROM node:18 AS backend-build

WORKDIR /backend

COPY backend/package*.json ./

RUN npm install

COPY backend .

RUN npm run build

# Stage 3: Set up the MySQL database
FROM mysql:8.0.41 AS mysql

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=app_db

# Stage 4: Serve the frontend application
FROM nginx:alpine AS frontend

COPY --from=frontend-build /frontend/dist /usr/share/nginx/html

# Stage 5: Run the backend application
FROM node:18 AS backend

WORKDIR /backend

COPY --from=backend-build /backend /backend

RUN npm install -g ts-node

# Expose ports
EXPOSE 80
EXPOSE 8000
EXPOSE 3306

# Start all services
CMD ["sh", "-c", "service mysql start && nginx -g 'daemon off;' && ts-node /backend/src/app.ts"]
