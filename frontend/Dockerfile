# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the full source code
COPY . .

# Run build (ensure the build output goes to /dist)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built frontend files into the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Use a custom Nginx config (important for Vue/React routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (important for Railway)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]