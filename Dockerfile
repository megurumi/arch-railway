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

# Stage 3: Serve the frontend application with Nginx
FROM nginx:alpine AS frontend

COPY --from=frontend-build /frontend/dist /usr/share/nginx/html

EXPOSE 8080

# Stage 4: Run the backend application
FROM node:18 AS backend

WORKDIR /backend

COPY --from=backend-build /backend /backend

RUN npm install --omit=dev  # Install only production dependencies

EXPOSE 8000

CMD ["node", "dist/app.js"]