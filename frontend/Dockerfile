# Stage 1: Build the application
FROM node:16 AS build

WORKDIR /app

RUN rm -rf node_modules package-lock.json dist

COPY . .

RUN npm cache clean --force

RUN npm ci

RUN npm install @rollup/rollup-linux-arm64-gnu

RUN npm uninstall esbuild

RUN npm install esbuild@0.25.0

RUN npm install @esbuild/linux-arm64@0.25.0

RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]